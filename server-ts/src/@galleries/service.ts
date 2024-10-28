import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import mongoose, { Model } from "mongoose";

import { RESPONSE_MESSAGES } from "@sharedTypes/enums";
import { Gallery } from "@sharedTypes/interfaces";
import { CommonService } from "@common";

@Injectable()
export class GalleryService extends CommonService {
  constructor(
    @InjectModel(Gallery.name) private databaseModel: Model<Gallery>
  ) {
    super();
  }

  async fetchAll(query, filter, page, records) {
    const totalDocs = await this.countDocs(query, this.databaseModel);

    const modelResponse = await this.databaseModel
      .find(query)
      .sort(filter)
      .skip(page * records - records)
      .limit(records)
      .then((pResults) => pResults)
      .catch((err) => {
        console.log(err);
        return null;
      });

    return this.returnSuccess(modelResponse, totalDocs);
  }

  async getGalleryCount(type, id) {
    if (!type || !id) {
      return null;
    }

    let query = {};

    switch (type) {
      case 'profile':
        query = { profiles: id }
        break;
      case 'studio':
        query = { studio: id }
        break;
    }
    const count = await this.countDocs(query, this.databaseModel);
    console.log(count);
    return count;
  }

  async getRecord(pId) {
    return this.fetchRecord(pId, this.databaseModel);
  }

  async postSave(newRecord) {
    if (newRecord.profiles?.length) {
      newRecord.profiles.forEach((profile) => {
        delete (profile.profile);
      });
    }
    return this.saveRecord(newRecord, this.databaseModel);
  }

  async updateMainImage(pId, newRecord) {
    const filter = {
      _id: new mongoose.Types.ObjectId(pId)
    };
    const modelResponse = await this.databaseModel
      .findOneAndUpdate(
        filter,
        {
          $set: {
            mainImage: newRecord
          },
        }
      )
      .then((pResults) => pResults)
      .catch((err) => {
        console.log(err);
        return null;
      });
    let status;
    if (modelResponse._id) {
      status = this.returnSuccess(modelResponse, null, RESPONSE_MESSAGES.updated);
    } else {
      status = this.returnError(RESPONSE_MESSAGES.notUpdated);
    }
    return status;
  }

  async postCreate(pRequest) {
    if (pRequest.profiles?.length) {
      pRequest.profiles.forEach((profile) => {
        delete (profile.profile);
      });
    }
    let newRecord = new this.databaseModel(pRequest);

    let query = {
      $and: [
        {
          itemSlug: newRecord.itemSlug,
        },
      ],
    };

    if (!newRecord.name) {
      return this.returnError(RESPONSE_MESSAGES.badData);
    } else {
      const modelResponse = await this.databaseModel
        .find(query)
        .then((pResults) => pResults)
        .catch((err) => {
          console.log(err);
          return null;
        });

      if (modelResponse.length) {
        newRecord.itemSlug = this.replaceText(newRecord.itemSlug + ' ' + new Date());
      };

      return this.createRecord(newRecord, this.databaseModel);
    }
  }
}
