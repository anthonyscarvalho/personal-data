import { Body, Controller, Param, Post, Put } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { ApiTags } from "@nestjs/swagger";

import { getRequest } from '@sharedTypes/interfaces';
import { BaseController } from "@common";

import { DashboardService } from "./service";

@ApiTags('Dashboard')
@Controller('v1/dashboard')
export class DashboardV1Controller extends BaseController {
  constructor(
    private readonly _moduleService: DashboardService,
    private readonly jwtService: JwtService
  ) {
    super();
  }

  @Post('/view')
  async postViewGalleries(@Body() pRequest: getRequest) {
    const date = new Date();
    const lastDay = new Date(date.getFullYear(), date.getMonth(), 0).getDate();

    const dashQuery = [
      {
        $match: {
          createdAt: {
            '$gte': new Date(`${date.getFullYear()}-${date.getMonth()}-1`),
            '$lte': new Date(`${date.getFullYear()}-${date.getMonth() + 1}-${lastDay}`)
          }
        }
      },
      {

        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          count: {
            $sum: 1
          }
        }
      }
    ];

    const response = {
      totalGalleries: await this._moduleService.countDocuments('gallery'),
      totalStudios: await this._moduleService.countDocuments('studio'),
      totalProfiles: await this._moduleService.countDocuments('profile'),
      recentGalleries: await this._moduleService.recentDocuments('gallery', dashQuery),
      recentProfiles: await this._moduleService.recentDocuments('profile', dashQuery),
      recentStudios: await this._moduleService.recentDocuments('studio', dashQuery),
    };

    return this.returnSuccess(response);
  }
}
