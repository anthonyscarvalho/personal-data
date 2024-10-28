import { Controller, Get, Param } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";

import { Enums } from "@sharedTypes/interfaces";
import { BaseController } from "@common";

@ApiTags('Image')
@Controller('v1/enums')
export class EnumsController extends BaseController {
  constructor(
    @InjectModel(Enums.name) private databaseModel: Model<Enums>,
  ) {
    super();
  }

  @Get('/health')
  getMain(): object {
    return { status: 'operational' };
  }

  @Get('/:type')
  //@UseGuards(new AuthMiddleware(new ConfigService()))
  // @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({ summary: 'Get enums' })
  @ApiResponse({ status: 200, description: 'Image Uploaded Successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async viewEnums(@Param('type') type: string,) {
    const _response = this.newResponse();
    const query = {
      enumType: type,
    };

    await this.databaseModel.countDocuments(query)
      .then((pResults) => {
        _response.totalRecords = pResults;
      });

    await this.databaseModel
      .find(query)
      .sort({
        order: 1,
      })
      .then((pResults) => {
        _response.data = pResults;
      })

    return _response;
  }
}
