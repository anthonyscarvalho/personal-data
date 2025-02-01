import { Body, Controller, Param, Post, Put } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { ApiTags } from "@nestjs/swagger";

import { getRequest } from '@sharedTypes/interfaces';
import { BaseController } from "@common";

import { BudgetService } from "./service";

@ApiTags('Budget')
@Controller('v1/budgets')
export class BudgetV1Controller extends BaseController {
  constructor(
    private readonly _moduleService: BudgetService,
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
      filter[orderBy] = orderDir;
    }

    const modelRecords = await this._moduleService.fetchAllPagination(query, filter, page, records);

    return modelRecords;
  }

  @Post('/viewAll')
  async postViewAll(@Body() pRequest: getRequest) {

    // const auth = headers['authorization'];
    // const decodedJwtAccessToken: JwtPayload = this.jwtService.decode(auth);
    const page = pRequest.page ? pRequest.page : 1;
    const records = pRequest.pagerRecords ? parseInt(pRequest.pagerRecords) : 20;
    const orderBy = pRequest.column ? pRequest.column : `1`;
    const orderDir = pRequest.dir === `ASC` ? 1 : -1;
    const searchPhrase = pRequest.searchPhrase ? pRequest.searchPhrase : `1`;
    let filter = {
      accountDescription: 1,
    };
    let query = {};

    const modelRecords = await this._moduleService.fetchAllPagination(query, filter, page, records);

    return modelRecords;
  }

  @Post('/dash')
  async postDash(@Body() pRequest: getRequest) {

    // const auth = headers['authorization'];
    // const decodedJwtAccessToken: JwtPayload = this.jwtService.decode(auth);
    const page = pRequest.page ? pRequest.page : 1;
    const records = pRequest.pagerRecords ? parseInt(pRequest.pagerRecords) : 20;
    const orderBy = pRequest.column ? pRequest.column : `1`;
    const orderDir = pRequest.dir === `ASC` ? 1 : -1;
    const searchPhrase = pRequest.searchPhrase ? pRequest.searchPhrase : `1`;
    let filter = {
      description: 1,
    };
    let query = {
      canceled: 'false',
    };

    const modelRecords = await this._moduleService.fetchAllPagination(query, filter, page, records);

    return modelRecords;
  }

  @Post('/budget_data')
  async postBudgetData(@Body() pRequest: getRequest) {

  //   // const auth = headers['authorization'];
  //   // const decodedJwtAccessToken: JwtPayload = this.jwtService.decode(auth);
  //   const page = pRequest.page ? pRequest.page : 1;
  //   let filter = {
  //     description: 1,
  //   };
  //   let query = {
  //     canceled: 'false',
  //   };
  //   const months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];

  //   let budgetData = [];
  //   let year = pRequest.year;
  //   let budgetItem = pRequest.budgetItem;


  // for (let indexB = 0; indexB < months.length; indexB++) {
  //   let month = months[indexB];

  //   let resPayment = 0;
  //   let resBudget = budgetItem.budget;
  //   let resActual = budgetItem.actual;

  //   let find = {
  //     budgetYear: year.toString(),
  //     budgetMonth: month,
  //     budgetId: budgetItem._id,
  //   };

  //   resPayment = await databaseAccountsRecordsModel.find(find).then((pRecordRes) => {
  //     let payments = 0;
  //     if (pRecordRes && pRecordRes.length) {
  //       for (let index = 0; index < pRecordRes.length; index++) {
  //         payments += Math.abs(pRecordRes[index]['debit']);
  //       }
  //     }
  //     return payments;
  //   });

  //   const returnData = {
  //     date: `${year}-${month}-01`,
  //     budget: resBudget,
  //     actual: resActual,
  //     payment: resPayment,
  //   };
  //   budgetData.push(returnData);
  // }

  //   return modelRecords;
  }

  @Post('/edit/:id')
  async postEdit(@Body() pRequest: getRequest, @Param() pParams) {
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
}
