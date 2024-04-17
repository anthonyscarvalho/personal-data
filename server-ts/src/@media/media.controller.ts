import { Body, Controller, Headers, Post, Get, Res, Param, UseGuards, Req, Response, UploadedFile, UseInterceptors } from '@nestjs/common';
import { I18nService } from 'nestjs-i18n';
import { v4 as uuidv4 } from 'uuid';
import crypto from 'crypto';
import { JwtService } from "@nestjs/jwt";
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from 'multer';
import { join as pathJoin } from 'path';
import fs, { ReadStream } from 'fs';

import { BaseController, getRequest, postRequest } from '@common';
import { MediaService } from './media.service';
import { postUploadSingle } from '@media';
let mediaPath = '';
const storage = diskStorage({
  destination: (req, file, cb) => {
    const body = req.body;
    mediaPath = pathJoin(__dirname, '..', '..', process.env.FILE_ROOT, body.moduleType, body.entityId);

    if (!fs.existsSync(mediaPath)) {
      try {
        fs.mkdirSync(mediaPath, { recursive: true });
      } catch (error) {
      }
    }
    cb(null, mediaPath);
  },
  filename: (req, file, cb) => {
    const body = req.body;
    const cleanFileName = Clean_File_Name(body.name);
    cb(null, cleanFileName);
  },
});

// const upload = multer({
//   storage: storage,
//   preservePath: true,
// });

const algorithm = 'sha1';

@ApiTags('Media')
@Controller('v1/media')
export class MediaV1Controller extends BaseController {
  constructor(
    i18n: I18nService,
    private readonly _moduleService: MediaService,
  ) {
    super(i18n);
  }

  @Get('/get/:id')
  async getMedia(@Headers() pHeaders: Headers, @Body() pRequest: getRequest, @Param() pParams: any) {
    const modelResults = await this._moduleService.fetchMedia(pParams.id);

    return modelResults;
  }

  @Post('/get/:id')
  async postMedia(@Headers() pHeaders: Headers, @Body() pRequest: postRequest, @Param() pParams: any) {
    var moduleType = pRequest.moduleType;
    //   var filePath = path.join(__dirname, '..', config.fileRoot, newRecord.moduleType, newRecord.entityId);
    var entityId = pRequest.entityId;
    var query = {};

    if (moduleType) {
      query = {
        moduleType: moduleType,
        entityId: entityId,
      };
      var sort = {
        year: 1,
      };
    }

    const modelResults = await this._moduleService.fetchAllMedia(query, sort, pParams.id);

    return modelResults;
  }


  // @Post('/upload')
  // //@UseGuards(new AuthMiddleware(new ConfigService()))
  // @UseInterceptors(FileInterceptor('file'))
  // @ApiOperation({ summary: 'Upload Image' })
  // @ApiResponse({ status: 200, description: 'Image Uploaded Successfully' })
  // @ApiResponse({ status: 401, description: 'Unauthorized' })
  // async uploadImage(@UploadedFile() file: Express.Multer.File) {
  //   const guid = uuidv4();
  //   const doc = await this.imageService.uploadImageBuffer(file.buffer, `${guid}.${file.mimetype}`, process.env.TEMP_BUCKET_NAME);

  //   return this.returnSuccess(doc);
  // }


  @Post('/upload-single')
  //@UseGuards(new AuthMiddleware(new ConfigService()))
  @UseInterceptors(FileInterceptor('media', { storage }))
  // @ApiOperation({ summary: 'Upload Single File' })
  // @ApiResponse({ status: 200, description: 'File Uploaded Successfully' })
  // @ApiResponse({ status: 401, description: 'Unauthorized' })
  // async uploadSingle(@UploadedFile() file: Express.Multer.File) {
  async uploadSingle(@UploadedFile() file: Express.Multer.File, @Body() pRequest: postUploadSingle, @Res({ passthrough: true }) pRes: Response) {
    try {
      const shasum = crypto.createHash(algorithm);
      const fileName = file.filename;
      if (!fileName) {
        this.returnError('Please select an image to upload');
      }
      // else if (next instanceof multer.MulterError) {
      //   _response.status = `01`;
      //   Update_Error_Log(next.message);
      // }

      const newRecord = pRequest;
      // const createThumb = req.createThumb;
      delete newRecord.createThumb;
      newRecord.name = fileName;
      if (!newRecord.name) {
        this.returnError('Bad data');
      } else {
        // var filePath = pathJoin(__dirname, '..', config.fileRoot, newRecord.moduleType, newRecord.entityId);
        // var filePath = config.fileRoot + `/` + newRecord.moduleType + `/` + newRecord.entityId + `/`;

        const fullFilePath = mediaPath + '/' + fileName;
        // const largeFile = filePath + 'lg_' + fileName;
        // const mediumFile = filePath + 'md_' + fileName;
        // const smallFile = filePath + 'sm_' + fileName;

        const sha1 = path => new Promise((resolve, reject) => {
          const hash = crypto.createHash('sha1')
          const rs = fs.createReadStream(path)
          rs.on('error', reject)
          rs.on('data', chunk => hash.update(chunk))
          rs.on('end', () => {
            // const smThumb = (createThumb) ? createSmallThumb(fullFilePath, smallFile) : false;
            //   // const mdThumb = (createThumb) ? createMediumThumb(fullFilePath, mediumFile) : false;
            //   // const lgThumb = (createThumb) ? createLargeThumb(fullFilePath, largeFile) : false;

            //   // newRecord.nameSm = (smThumb == true) ? smallFile : null;
            //   // newRecord.nameMd = (mdThumb == true) ? mediumFile : null;
            //   // newRecord.nameLg = (lgThumb == true) ? largeFile : null;
            resolve(hash.digest('hex'));
          })
        })


        const hash = await sha1(fullFilePath).then(hash => {
          return hash as string;
        }).catch(err => {
          throw new Error(err)
        });

        newRecord.fileHash = hash;
        const query = {
          fileHash: newRecord.fileHash,
          moduleType: newRecord.moduleType,
          entityId: newRecord.entityId,
        };

        const response = await this._moduleService.save(query, newRecord);
        console.log(response);
        return response;
        // fs.unlinkSync(req.file.path)
      }
    } catch (error) {
      throw error;
    }
  }
}

function checksumFile(algorithm, path) {
  return new Promise((resolve, reject) => {
    let fs = require('fs');
    let crypto = require('crypto');

    let hash = crypto.createHash(algorithm).setEncoding('hex');
    fs.createReadStream(path)
      .once('error', reject)
      .pipe(hash)
      .once('end', function () {
        resolve(hash.read());
      });
  });
}

function Clean_File_Name(string) {
  string = string.replace(/[&\/\\#,+()$~%'":*?<>{}]/g, ''); // Removes special chars.
  string = string.trim();
  string = string.replace(/\s+/g, '-'); // Replaces all spaces with hyphens.

  return string.replace(/-+/, '-');
}
