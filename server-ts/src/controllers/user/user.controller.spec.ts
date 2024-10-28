// import { Test, TestingModule } from '@nestjs/testing';
// import { UserController } from './user.controller';
// import { UserService } from '../../../services/user/user.service';
// import { KYCUserService } from '../../../services/kyc/kycuser.service';
// import { I18nService } from 'nestjs-i18n';
// import { ImageService } from '../../../services/image/image.service';
// import { getModelToken } from '@nestjs/mongoose';
// import { Model } from 'mongoose';
// import { User } from '../../../schemas/user.dto';
// import { HTTP_RESPONSE_CODES } from '../../../utility/constants.utility';
// import CognitoService from '../../../services/cognito/cognito.service';
// import { LoggingService } from '../../../services/logging/log.service';
// import { HttpException } from "@nestjs/common";

// // Mock I18nService
// const i18nServiceMock = {
//   t: jest.fn().mockImplementation((key: string) => key),
// };

// // Mock ImageService
// const imageServiceMock = {
//   t: jest.fn().mockImplementation((key: string) => key),
// };

// describe('UserController', () => {
//   let userController: UserController;
//   let userService: UserService;
//   let cognitoService: CognitoService;
//   let kycUserService: KYCUserService;
//   let userModel: Model<User>;

//   beforeEach(async () => {
//     const userModelMock = {
//       findOne: jest.fn(),
//       create: jest.fn(),
//       findById: jest.fn(),
//       findOneAndUpdate: jest.fn(),
//       aggregate: jest.fn(() => ({
//         lookup: jest.fn().mockReturnThis(),
//         exec: jest.fn(),
//       })),
//     };
//     const module: TestingModule = await Test.createTestingModule({
//       controllers: [UserController],
//       providers: [
//         UserService,
//         CognitoService,
//         KYCUserService,
//         LoggingService,
//         {
//           provide: I18nService,
//           useValue: i18nServiceMock,
//         },
//         {
//           provide: ImageService,
//           useValue: imageServiceMock,
//         },
//         {
//           provide: getModelToken(User.name),
//           useValue: userModelMock,
//         },
//       ],
//     }).compile();

//     userController = module.get<UserController>(UserController);
//     userService = module.get<UserService>(UserService);
//     cognitoService = module.get<CognitoService>(CognitoService);
//     kycUserService = module.get<KYCUserService>(KYCUserService);
//     userModel = module.get<Model<User>>(getModelToken(User.name))
//   });

//   describe('login', () => {
//     it('should log in a user with valid credentials', async () => {
//       // Mock necessary service methods
//       const loginResponse = {
//         id: 'someUserId',
//         role: 'user',
//         email: 'test@example.com',
//       };

//       const mockProfile = {
//         id: 'someUserId',
//         // ... other properties
//         toObject: jest.fn().mockReturnValue({
//           "kycCustomerId": "",
//           "_id": "someUserId",
//           "role": "user",
//           "userName": "someUser",
//           "firstName": "",
//           "lastName": "",
//           "email": "test@example.com",
//           "profilePictureId": "67890.png",
//           "password": "$2a$10$syRKtUNVbCtAvt1kN28bNOYDehIaDZtakbVlV6ho3nNKUqoMFHmte",
//           "image": "",
//           "address": "",
//           "street": "",
//           "profileStatus": 2,
//           "zipCode": null,
//           "isBlocked": false,
//           "id": "someUserId"
//         }),
//       };

//       const kycLoginResponse = {
//         data: {
//           data: {
//             _id: 'someUserId',
//             location: [Object],
//             isSocialLogin: false,
//             role: 'user',
//             fullName: '',
//             userName: '',
//             firstName: '',
//             lastName: '',
//             phone: '',
//             isProfileComplete: false,
//             isEmailVerify: true,
//             isPhoneVerify: false,
//             isVerifiedByAdmin: false,
//             image: '',
//             coverImage: '',
//             jti: '2778c7b1d971147f9731e6c78e6ff6b42642ec8c',
//             zipCode: null,
//             profileCompleteAt: 0,
//             walletAddress: null,
//             uniqueId: '40308',
//             address: '',
//             line: '',
//             line2: '',
//             city: '',
//             state: '',
//             country: '',
//             deviceType: 'IOS',
//             deviceToken: 'randomToken',
//             doc_hash: '',
//             kycPercent: '',
//             docType: '',
//             docNumber: '',
//             isEmailEnable: true,
//             isPhoneEnable: true,
//             isShareDoc: true,
//             isKycCompleted: false,
//             isKycCompletedSelf: false,
//             isKycCompletedByComp: false,
//             isAllDocCompleted: false,
//             selfieCount: 3,
//             isDeleted: false,
//             isBlocked: false,
//             latitude: '0',
//             longitude: '0',
//             kycMannualReq: false,
//             isOfacCheck: false,
//             isCrimeRecord: false,
//             isCompApproved: false,
//             isThumbKyc: false,
//             email: 'test@example.com',
//             createdAt: '2023-12-14T09:19:03.200Z',
//             updatedAt: '2023-12-18T07:23:51.206Z',
//             __v: 0,
//             token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTdhYzg4NzY1Mzc0OTc2OGU2OTI0NjgiLCJyb2xlIjoidXNlciIsImp0aSI6IjI3NzhjN2IxZDk3MTE0N2Y5NzMxZTZjNzhlNmZmNmI0MjY0MmVjOGMiLCJlbWFpbCI6InRoYWJvK3Rlc3QzQGhvb2xpZ2FuLmNvLnphIiwiaWF0IjoxNzAyODg0MjMxLCJleHAiOjE3MDM3NDgyMzF9.y86jmdkQAJc3V0duhFPAB6mzYd3H_RWaB4EHBImHTAQ',
//             type: 'Bearer',
//             expire: 10,
//             refreshToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTdhYzg4NzY1Mzc0OTc2OGU2OTI0NjgiLCJpYXQiOjE3MDI4ODQyMzEsImV4cCI6MTcwMzc0ODIzMX0.oUVpirGWDd9lYcHus7ONNRPiqBGFyx0mkYME03rj6mg',
//             message: 'Successful login'
//           },
//           statusCode: 200,
//           message: 'Successful login'
//         }
//       }
//       jest.spyOn(cognitoService, 'login').mockResolvedValue(true);
//       jest.spyOn(userService, 'login').mockResolvedValue(loginResponse);
//       jest.spyOn(kycUserService, 'login').mockResolvedValue(kycLoginResponse);
//       jest.spyOn(userService, 'fetchUserById').mockResolvedValue(mockProfile as any);

//       // Mock a valid login request
//       const validLoginRequest = {
//         email: 'test@example.com',
//         password: 'password',
//         profileStatus: 2,
//         role: 'user',
//         deviceType: 'IOS',
//         deviceToken: 'randomToken',
//       };

//       // Simulate the login request to the endpoint
//       const response = await userController.login(validLoginRequest);

//       // Verify the response status and content
//       expect(response.statusCode).toBe(HTTP_RESPONSE_CODES.OK);
//       expect(response.data.email).toBe('test@example.com');
//       expect(response.data.kycRefreshToken).toBe('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTdhYzg4NzY1Mzc0OTc2OGU2OTI0NjgiLCJpYXQiOjE3MDI4ODQyMzEsImV4cCI6MTcwMzc0ODIzMX0.oUVpirGWDd9lYcHus7ONNRPiqBGFyx0mkYME03rj6mg');
//       expect(response.data.kycToken).toBe('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTdhYzg4NzY1Mzc0OTc2OGU2OTI0NjgiLCJyb2xlIjoidXNlciIsImp0aSI6IjI3NzhjN2IxZDk3MTE0N2Y5NzMxZTZjNzhlNmZmNmI0MjY0MmVjOGMiLCJlbWFpbCI6InRoYWJvK3Rlc3QzQGhvb2xpZ2FuLmNvLnphIiwiaWF0IjoxNzAyODg0MjMxLCJleHAiOjE3MDM3NDgyMzF9.y86jmdkQAJc3V0duhFPAB6mzYd3H_RWaB4EHBImHTAQ');
//     });


//     it('should handle login errors gracefully', async () => {
//       // Mock necessary service methods
//       const mockResponse = {
//         status: jest.fn().mockReturnThis(),
//         json: jest.fn(),
//         statusCode: 400,
//       } as any;

//       // Mock necessary service methods
//       const loginResponse = {
//         id: 'someUserId',
//         role: 'user',
//         email: 'test@example.com',
//       };

//       // Mock necessary service methods to simulate an error during login
//       jest.spyOn(cognitoService, 'login').mockResolvedValue(false);
//       jest.spyOn(userService, 'login').mockResolvedValue(null);

//       const invalidLoginRequest = {
//         password: 'invalidPassword',
//         profileStatus: 2,
//         role: 'user',
//         deviceType: 'IOS',
//         deviceToken: 'randomToken',
//       };

//       try {
//         await userController.login(invalidLoginRequest);
//       } catch (error) {
//         expect(error.message).toBe('login.missing_phone_email');
//         expect(error.status).toBe(HTTP_RESPONSE_CODES.BAD_REQUEST);
//       }
//     });
//   });

//   describe('register', () => {
//     it('should register a new user successfully', async () => {
//       // Mock necessary service methods
//       jest.spyOn(cognitoService, 'register').mockResolvedValue(true);
//       jest.spyOn(kycUserService, 'registerUser').mockResolvedValue({data: { email: 'thabo+test30@hooligan.co.za'}});
//       jest.spyOn(userService, 'register').mockResolvedValue({
//         data: {
//           socialId: '',
//           role: 'user',
//           fullName: 'Jeremy Bentham',
//           userName: 'jeremy+test30@hooligan.co.za',
//           firstName: 'Jeremy',
//           lastName: 'Bentham',
//           email: 'jeremy+test30@hooligan.co.za',
//           phone: '68915740',
//           saIdNo: '7598437480325430',
//           countryCode: '266',
//           isProfileComplete: false,
//           isPhoneVerify: false,
//           isVerifiedByAdmin: false,
//           password: '$2a$10$7mqPQeu07AAXkg6Yc0OT4uh1/P/D0gAsyah1B6WiacweFL3SIoxWi',
//           submitKey: '',
//           deviceId: '',
//           passCode: '',
//           passCodeRandom: '',
//           image: 'https://qa-truro-coin-images.s3.eu-west-1.amazonaws.com/dawson_crying.jpeg',
//           address: 'Tatooine West',
//           street: '17 Bobba Fett Street',
//           profileStatus: 0,
//           coverImage: '',
//           dateOfBirth: '',
//           jti: '',
//           zipCode: '100',
//           profileCompleteAt: 0,
//           ukhesheCustomerId: '',
//           kycCustomerId: '',
//           ukhesheExternalCustomerId: '',
//           locale: null,
//           referral: '',
//           location: {
//             type: 'Point',
//             coordinates: [0, 0],
//           },
//           deviceType: '',
//           deviceToken: '',
//           isKYCCompleted: false,
//           selfieIsASelfie: false,
//           selfieIsLegitimate: false,
//           selfieMatchesIdentity: false,
//           firstNameMatchesIdentity: false,
//           lastNameMatchesIdentity: false,
//           identityNumberMatchesIdentity: false,
//           isNotificationEnable: false,
//           isDeleted: false,
//           isBlocked: false,
//           latitude: 0,
//           longitude: 0,
//           userType: 'TRURO',
//           queryCount: 0,
//           _id: '6595079a2ad83fb3356705c6',
//           createdAt: '2024-01-03T07:07:06.208Z',
//           updatedAt: '2024-01-03T07:07:06.208Z',
//           __v: 0,
//           id: '6595079a2ad83fb3356705c6',
//         },
//         statusCode: 200,
//         message: 'OK',
//       } as any);

//       // Mock a valid register request
//       const preferredCredential: 'email' | 'phone' = 'email';
//       const validRegisterRequest = {
//         email: 'jeremy+test30@hooligan.co.za',
//         phone: '68915740',
//         countryCode: '266',
//         password: 'MachineGunRap_1984',
//         firstName: 'Jeremy',
//         lastName: 'Bentham',
//         fullName: 'Jeremy Bentham',
//         userName: '',
//         saIdNo: 'RC019091',
//         image: 'https://qa-truro-coin-images.s3.eu-west-1.amazonaws.com/dawson_crying.jpeg',
//         street: '17 Bobba Fett Street',
//         address: 'Tatooine West',
//         zipCode: '100',
//         role: 'user',
//         preferredCredential
//       }

//       // Simulate the register request to the endpoint
//       const response = await userController.register(validRegisterRequest);

//       // Verify the response status and content
//       expect(response.data.statusCode).toBe(HTTP_RESPONSE_CODES.OK);
//       expect(response.data.data.email).toBe('jeremy+test30@hooligan.co.za');
//     });

//     it('should handle registration errors gracefully', async () => {
//       const mockResponse = {
//         status: jest.fn().mockReturnThis(),
//         json: jest.fn(),
//         statusCode: 500,
//       } as any;

//       // Mock necessary service methods to simulate an error during registration
//       jest.spyOn(cognitoService, 'register').mockResolvedValue(false);

//       const invalidRegisterRequest = {
//         password: 'MachineGunRap_1984',
//         fullName: 'Test User',
//         userName: 'testuser83',
//         govIssuedIdentificationId: '12345',
//         profilePictureId: '67890.png',
//         role: 'user',
//         preferredCredential: 'email',
//       };

//       try {
//         await userController.register(invalidRegisterRequest as any);
//       } catch (error) {
//         expect(error).toBeInstanceOf(HttpException);
//         expect(error.getResponse()).toEqual('register.missing_phone_email');
//       }
//     });
//   });
// });
