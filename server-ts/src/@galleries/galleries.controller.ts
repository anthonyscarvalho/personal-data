import { Body, Headers, Controller, Param, Response, Get, Res, Post, Put } from '@nestjs/common';
import { getRequest } from '../@common/models/api-request.model';
import {

} from './schema/api.request';
import { GalleryService } from './galleries.service';
import { BaseController } from '@common';
import { I18nService } from 'nestjs-i18n';
import { JwtPayload } from "jsonwebtoken";
import { JwtService } from "@nestjs/jwt";
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Gallery')
@Controller('v1/galleries')
export class GalleryV1Controller extends BaseController {
  constructor(
    i18n: I18nService,
    private readonly _moduleService: GalleryService,
    private readonly jwtService: JwtService
  ) {
    super(i18n);
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

    const modelRecords = await this._moduleService.fetchRecords(query, filter, page, records);

    return modelRecords;
  }

  @Post('/edit/:id')
  async postEditGallery(@Body() pRequest: getRequest, @Param() pParams) {
    const modelRecords = await this._moduleService.getRecord(pParams.id);
    return modelRecords;
  }

  @Post('/add')
  async postAddGallery(@Body() pRequest: getRequest) {
    const modelRecords = await this._moduleService.postCreate(pRequest);

    return modelRecords;
  }

  @Put('/update/:id')
  async postUpdateGallery(@Body() pRequest: getRequest, @Param() pParams) {
    const modelRecords = await this._moduleService.postSave(pRequest);

    return modelRecords;
  }
}
