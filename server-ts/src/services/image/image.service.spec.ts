// import { ImageService } from './image.service';
// import { I18nService } from 'nestjs-i18n';
// import { LoggingService } from '../logging/log.service';

// describe('ImageService', () => {
//   let imageService: ImageService;

//   beforeEach(() => {
//     const i18nServiceMock = {} as I18nService;
//     const logServiceMock = {} as LoggingService; // Create a mock for LoggingService
//     imageService = new ImageService(i18nServiceMock, logServiceMock);
//   });

//   beforeAll(() => {
//     process.env.AWS_S3_ID = 'mock-access-key';
//     process.env.AWS_APP_CLIENT_SECRET = 'mock-secret-key';
//   });

//   describe('doesImageExist', () => {
//     it('should return true if the image exists in the S3 bucket', async () => {
//       // Mock AWS.S3.headObject to resolve without throwing an error
//       jest.spyOn(imageService['s3'], 'headObject' as any).mockImplementation(() => ({ promise: jest.fn() }));

//       const exists = await imageService.doesImageExist('existing-image-key');

//       expect(exists).toBe(true);
//       expect(imageService['s3'].headObject).toHaveBeenCalledWith({ Bucket: 'qa-truro-coin-images', Key: 'existing-image-key' });
//     });

//     it('should return false if the image does not exist in the S3 bucket', async () => {
//       // Mock AWS.S3.headObject to throw a 'NotFound' error
//       jest.spyOn(imageService['s3'], 'headObject').mockImplementation(() => {
//         throw { code: 'NotFound' };
//       });

//       const exists = await imageService.doesImageExist('non-existing-image-key');

//       expect(exists).toBe(false);
//       expect(imageService['s3'].headObject).toHaveBeenCalledWith({ Bucket: 'qa-truro-coin-images', Key: 'non-existing-image-key' });
//     });

//     it('should throw an error for other AWS errors', async () => {
//       // Mock AWS.S3.headObject to throw an error other than 'NotFound'
//       jest.spyOn(imageService['s3'], 'headObject').mockImplementation(() => {
//         throw new Error('Some AWS Error');
//       });

//       await expect(imageService.doesImageExist('invalid-image-key')).rejects.toThrowError();
//       expect(imageService['s3'].headObject).toHaveBeenCalledWith({ Bucket: 'qa-truro-coin-images', Key: 'invalid-image-key' });
//     });
//   });

//   describe('getImageUrl', () => {
//     it('should return the URL of an existing image', async () => {
//       jest.spyOn(imageService, 'doesImageExist').mockResolvedValue(true);

//       const imageUrl = await imageService.getImageUrl('existing-image-key', 'default-image-key');

//       expect(imageUrl).toEqual('https://qa-truro-coin-images.s3.eu-west-1.amazonaws.com/existing-image-key');
//       expect(imageService.doesImageExist).toHaveBeenCalledWith('existing-image-key');
//     });

//     it('should return the URL of the default image if the requested image does not exist', async () => {
//       jest.spyOn(imageService, 'doesImageExist').mockResolvedValue(false);

//       const imageUrl = await imageService.getImageUrl('non-existing-image-key', 'default-image-key');

//       expect(imageUrl).toEqual('https://qa-truro-coin-images.s3.eu-west-1.amazonaws.com/default-image-key');
//       expect(imageService.doesImageExist).toHaveBeenCalledWith('non-existing-image-key');
//     });
//   });

//   describe('getImageUrls', () => {
//     it('should return an array of image URLs for provided image keys', async () => {
//       jest.spyOn(imageService, 'getImageUrl').mockReturnValueOnce(Promise.resolve('url1'));
//       jest.spyOn(imageService, 'getImageUrl').mockReturnValueOnce(Promise.resolve('url2'));

//       const imageUrls = await imageService.getImageUrls(['key1', 'key2'], 'default-image-key');

//       expect(imageService.getImageUrl).toHaveBeenCalledTimes(2);
//       expect(imageService.getImageUrl).toHaveBeenCalledWith('key1', 'default-image-key');
//       expect(imageService.getImageUrl).toHaveBeenCalledWith('key2', 'default-image-key');
//     });
//   });
// });
