import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

import { Gallery, Studio, Profile } from "@sharedTypes/interfaces";
import { RESPONSE_MESSAGES } from "@sharedTypes/enums";
import { CommonService } from "@common";

@Injectable()
export class DashboardService extends CommonService {
  constructor(
    @InjectModel('gallery') private galleryModel: Model<Gallery>,
    @InjectModel('profile') private profileModel: Model<Profile>,
    @InjectModel('studio') private studioModel: Model<Studio>
  ) {
    super();
  }

  async recentDocuments(pModel, query) {
    let _model = null;
    switch (pModel) {
      case 'gallery':
        _model = this.galleryModel;
        break;
      case 'studio':
        _model = this.studioModel;
        break;
      case 'profile':
        _model = this.profileModel;
        break;
    }

    return await _model.aggregate(query).sort({ _id: 1 });
  }

  async countDocuments(pModel, query = {}) {
    let _model = null;
    switch (pModel) {
      case 'gallery':
        _model = this.galleryModel;
        break;
      case 'studio':
        _model = this.studioModel;
        break;
      case 'profile':
        _model = this.profileModel;
        break;
    }
    if (_model) {
      return await this.countDocs(query, _model);
    }
  }
}
