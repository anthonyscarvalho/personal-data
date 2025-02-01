import { Body, Controller, Param, Post, Put, Delete } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { ApiTags } from "@nestjs/swagger";

import { getRequest } from '@sharedTypes/interfaces';
import { BaseController } from "@common";

import { BankAccountsService } from "./service";

@ApiTags('BankAccounts')
@Controller('v1/bank-accounts')
export class BankAccountsV1Controller extends BaseController {
  constructor(
    private readonly _moduleService: BankAccountsService,
    private readonly jwtService: JwtService
  ) {
    super();
  }

  @Post('/view')
  async postView(@Body() pRequest: getRequest) {
    // const auth = headers['authorization'];
    // const decodedJwtAccessToken: JwtPayload = this.jwtService.decode(auth);
    const page = pRequest.page ? pRequest.page : 1;
    const records = pRequest.pagerRecords ? parseInt(pRequest.pagerRecords) : 20;
    const orderBy = pRequest.column ? pRequest.column : `1`;
    const orderDir = pRequest.dir === `ASC` ? 1 : -1;
    const searchPhrase = pRequest.searchPhrase ? pRequest.searchPhrase : ``;
    let sortBy = {};
    let query = {};

    if (searchPhrase != ``) {
      query = {
        $or: [
          {
            accountDescription: {
              $regex: new RegExp(searchPhrase, `i`),
            },
          },
          {
            accountNumber: {
              $regex: new RegExp(searchPhrase, `i`),
            },
          },
        ],
      };
    }

    if (pRequest.state != `all`) {
      query['canceled'] = pRequest.state;
    }

    if (orderBy) {
      sortBy[orderBy] = orderDir;
    }

    const modelRecords = await this._moduleService.fetchAllPagination(query, sortBy, page, records);

    return modelRecords;
  }

  @Post('/viewAll')
  async postViewAll() {
    let sortBy = {
      accountDescription: 1
    };
    let query = {
      canceled: 'false',
    };

    const modelRecords = await this._moduleService.fetchAll(query, sortBy);

    return modelRecords;
  }

  @Post('/view/dash')
  async postDash() {
    let sortBy = {
      accountDescription: 1
    };
    let query = {
      canceled: 'false',
    };

    const modelRecords = await this._moduleService.fetchAll(query, sortBy);

    return modelRecords;
  }

  @Post('/get-default')
  async postGetDefault() {
    let query = {
      defaultAccount: 'true',
    };

    const modelRecords = await this._moduleService.findOne(query);

    return modelRecords;
  }

  @Post('/edit/:id')
  async postEdit(@Param() pParams) {
    const modelRecords = await this._moduleService.getRecord(pParams.id);
    return modelRecords;
  }

  @Post('/add')
  async postAdd(@Body() pRequest: getRequest) {
    return await this._moduleService.postCreate(pRequest);
  }

  @Put('/update/:id')
  async postUpdate(@Body() pRequest: getRequest, @Param() pParams) {
    return await this._moduleService.postSave(pRequest);
  }

  @Delete('/delete/:id')
  async postDelete(@Body() pRequest: getRequest, @Param() pParams) {
    return await this._moduleService.postSave(pRequest);
  }
}
