import { Body, Controller, Param, Post, Put } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { ApiTags } from "@nestjs/swagger";

import { getRequest } from '@sharedTypes/interfaces';
import { BaseController } from "@common";

import { GalleryService } from "./service";

@ApiTags('Gallery')
@Controller('v1/galleries')
export class GalleryV1Controller extends BaseController {
  constructor(
    private readonly _moduleService: GalleryService,
    private readonly jwtService: JwtService
  ) {
    super();
  }

  @Post('/view')
  async postViewGalleries(@Body() pRequest: getRequest) {
    // const auth = headers['authorization'];
    // const decodedJwtAccessToken: JwtPayload = this.jwtService.decode(auth);
    const page = pRequest.page ? pRequest.page : 1;
    const records = pRequest.pagerRecords ? parseInt(pRequest.pagerRecords) : 20;
    const orderBy = pRequest.column ? pRequest.column : `1`;
    const orderDir = pRequest.dir === `ASC` ? 1 : -1;
    const searchPhrase = pRequest.searchPhrase ? pRequest.searchPhrase : `1`;
    let filter = {
      name: 1,
      surname: 1,
    };
    let query = {};

    if (searchPhrase != `1`) {
      query = {
        $or: [
          {
            name: {
              $regex: new RegExp(searchPhrase, 'i'),
            },
          },
          {
            middleName1: {
              $regex: new RegExp(searchPhrase, 'i'),
            },
          },
          {
            middleName2: {
              $regex: new RegExp(searchPhrase, 'i'),
            },
          },
          {
            middleName3: {
              $regex: new RegExp(searchPhrase, 'i'),
            },
          },
          {
            surname: {
              $regex: new RegExp(searchPhrase, 'i'),
            },
          },
        ],
      };
    }

    if (pRequest.state != `all`) {
      query['canceled'] = pRequest.state;
    }

    if (orderBy) {
      filter[orderBy] = orderDir;
    }

    const modelRecords = await this._moduleService.fetchAll(query, filter, page, records);

    return modelRecords;
  }

  @Post('/edit/:id')
  async postEditGallery(@Body() pRequest: getRequest, @Param() pParams) {
    const modelRecords = await this._moduleService.getRecord(pParams.id);
    return modelRecords;
  }

  @Post('/get-gallery-id')
  async postGetGalleryId(@Body() pRequest: getRequest, @Param() pParams) {
    const modelRecords = await this.postViewGalleries(pRequest);
    const data = modelRecords.data.map((record) => record.id);
    return data;
  }

  @Post('/add')
  async postAddGallery(@Body() pRequest: getRequest) {
    return await this._moduleService.postCreate(pRequest);
  }

  @Put('/update/:id')
  async postUpdateGallery(@Body() pRequest: getRequest, @Param() pParams) {
    return await this._moduleService.postSave(pRequest);
  }

  @Put('/image/:id')
  async postUpdateImage(@Body() pRequest: { imageId: string }, @Param() pParams) {
    return await this._moduleService.updateMainImage(pParams.id, pRequest.imageId);
  }
}
