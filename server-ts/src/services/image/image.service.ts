import { Injectable } from '@nestjs/common';
import { BaseService } from '../../@common/services/base.service';
import { I18nService } from 'nestjs-i18n';
import { LoggingService } from '../../@common/services/log.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ImageService extends BaseService {
  private bucketName: string = 'qa-truro-coin-images';
  private shortS3BaseURL: string = 'eu-west-1.amazonaws.com';

  constructor(
    i18n: I18nService,
    log: LoggingService,
  ) {
    super(i18n, log);
    // this.s3 = new AWS.S3();
  }

  async doesImageExist(imageKey: string): Promise<boolean> {
    try {
      console.log('Image found.');
      return true;
    } catch (error) {
      if (error.code === 'NotFound') {
          console.log('Image not found.');
        return false;
      }
      throw error;
    }
  }

  async getImageUrl(imageKey: string, defaultImageKey: string): Promise<string> {
    const exists = await this.doesImageExist(imageKey);
    if (exists) {
      return `https://${this.bucketName}.s3.${this.shortS3BaseURL}/${imageKey}`;
    } else {
      return `https://${this.bucketName}.s3.${this.shortS3BaseURL}/${defaultImageKey}`;
    }
  }

  getImageUrls(imageKeys: string[], defaultImageKey: string): Promise<string>[] {
    return imageKeys.map(key => this.getImageUrl(key, defaultImageKey));
  }

  // async uploadImage(imageData: string, fileName: string, bucketName: string) {
  //     AWS.config.update({ region: 'eu-west-1', credentials: { accessKeyId: process.env.AWS_S3_KEY_ID, secretAccessKey: process.env.AWS_S3_KEY_SECRET }});

  //     const buf = Buffer.from(imageData.replace(/^data:image\/\w+;base64,/, ""), 'base64');

  //     const s3 = new AWS.S3({ apiVersion: '2006-03-01' });

  //     const uploadParams = { Bucket: bucketName, Key: fileName, Body: buf, ACL: 'public-read' };

  //     try {
  //         const res = await s3.upload(uploadParams, function (err, data) {
  //             if (err) {
  //                 console.log("Error", err);
  //             }
  //             if (data) {
  //                 console.log("Upload Success", data.Location);
  //             }
  //         }).promise();

  //         return res;
  //     } catch (e) {
  //         console.log(e);
  //     }
  // }

  async uploadImageBuffer(buf: Buffer, fileName: string, bucketName: string) {
      // AWS.config.update({ region: 'eu-west-1', credentials: { accessKeyId: process.env.AWS_S3_KEY_ID, secretAccessKey: process.env.AWS_S3_KEY_SECRET }});

      // const s3 = new AWS.S3({ apiVersion: '2006-03-01' });

      // const uploadParams = { Bucket: bucketName, Key: fileName, Body: buf, ACL: 'public-read' };

      // try {
      //     const res = await s3.upload(uploadParams, function (err, data) {
      //         if (err) {
      //             console.log("Error", err);
      //         }
      //         if (data) {
      //             console.log("Upload Success", data.Location);
      //         }
      //     }).promise();

      //     return res;
      // } catch (e) {
      //     console.log(e);
      // }
  }

  async uploadSingle(file: Express.Multer.File, bucketName: string): Promise<any | null> {
    // try {
    //     AWS.config.update({
    //         region: 'eu-west-1',
    //         credentials: {
    //             accessKeyId: process.env.AWS_S3_KEY_ID,
    //             secretAccessKey: process.env.AWS_S3_KEY_SECRET
    //         }
    //     });

    //     const s3 = new AWS.S3({ apiVersion: '2006-03-01' });
    //     const buf = Buffer.from(file.buffer);

    //     const uniqueFilename = `${uuidv4()}_${file.originalname}`;

    //     const uploadParams = {
    //         Bucket: bucketName,
    //         Key: uniqueFilename,
    //         Body: buf,
    //         ACL: 'public-read'
    //     };

    //     const result = await s3.upload(uploadParams).promise();
    //     console.log("Upload Success", result.Location);

    //     return { image: result.Location} ;
    // } catch (error) {
    //     console.error("Error during upload:", error);
    //     return null;
    // }
  }
}
