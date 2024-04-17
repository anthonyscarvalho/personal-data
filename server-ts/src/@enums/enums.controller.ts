import { Body, Controller, Post, Get, Param } from '@nestjs/common';
import { I18nService } from 'nestjs-i18n';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { Enums } from 'schemas';
import { BaseController, EnumsRequestModel } from '@common';

@ApiTags('Image')
@Controller('v1/enums')
export class EnumsController extends BaseController {
  constructor(
    i18n: I18nService,
    @InjectModel(Enums.name) private databaseModel: Model<Enums>,
  ) {
    super(i18n);
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
