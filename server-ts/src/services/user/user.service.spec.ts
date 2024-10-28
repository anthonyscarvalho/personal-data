// import { Test, TestingModule } from '@nestjs/testing';
// import { UserService } from './user.service';
// import { getModelToken } from '@nestjs/mongoose';
// import { Model } from 'mongoose';
// import { User } from '../../schemas/user.dto';
// import { I18nService } from 'nestjs-i18n';
// import { mockDeep } from 'jest-mock-extended';
// import * as ValidatorUtility from '../../utility/validator.utility';
// import { UnauthorizedException, BadRequestException } from '@nestjs/common';
// import { LoggingService } from "../logging/log.service";

// describe('UserService', () => {
//   let userService: UserService;
//   let userModel: Model<User>;
//   const i18nServiceMock = mockDeep<I18nService>();

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
//       providers: [
//         UserService,
//         LoggingService,
//         {
//           provide: getModelToken(User.name),
//           useValue: userModelMock,
//         },
//         {
//           provide: I18nService,
//           useValue: i18nServiceMock,
//         },
//       ],
//     }).compile();

//     userService = module.get<UserService>(UserService);
//     userModel = module.get<Model<User>>(getModelToken(User.name));
//   });

//   it('should be defined', () => {
//     expect(userService).toBeDefined();
//   });

//   describe('login', () => {
//     it('should successfully login with valid credentials', async () => {
//       // Mock user data
//       const mockUser = {
//         _id: 'someUserId',
//         email: 'example@email.com',
//         isDeleted: false,
//         password: 'hashedPassword',
//         isBlocked: false,
//       };

//       // Mock the fetchUserByEmail function to return a user
//       (userModel.findOne as jest.Mock).mockResolvedValue(mockUser);

//       // Mock request data
//       const loginRequest = {
//         email: 'example@email.com',
//         password: 'password123',
//         profileStatus: 2,
//         role: 'user',
//         deviceType: 'IOS',
//         deviceToken: 'randomToken',
//       };

//       const validatePasswordMock = jest.spyOn(ValidatorUtility, 'validatePassword');
//       validatePasswordMock.mockReturnValue(true);

//       const loggedInUser = await userService.login(loginRequest);

//       expect(userModel.findOne).toHaveBeenCalledWith(
//         { email: loginRequest.email, isDeleted: false },
//       );
//       expect(loggedInUser).toEqual(mockUser);
//     });

//     it('should throw BadRequestException on invalid credentials', async () => {
//       // Mock the fetchUserByEmail function to return null (indicating user doesn't exist)
//       (userModel.findOne as jest.Mock).mockResolvedValue(null);

//       // Mock request data with invalid credentials
//       const loginRequest = {
//         email: 'nonexistent@email.com',
//         password: 'invalidPassword',
//         profileStatus: 2,
//         role: 'user',
//         deviceType: 'IOS',
//         deviceToken: 'randomToken',
//       };

//       await expect(userService.login(loginRequest)).rejects.toThrow(BadRequestException);
//     });
//   });

//   describe('register', () => {
//     it('should register a new user successfully', async () => {
//       // Mock request data
//       const preferredCredential: 'email' | 'phone' = 'email';
//       const registerRequest = {
//         email: 'newuser@email.com',
//         password: 'password123',
//         role: 'user',
//         preferredCredential,
//       };

//       // Mock the fetchUserByEmail function to return null (indicating user doesn't exist)
//       (userModel.findOne as jest.Mock).mockResolvedValue(null);

//       // Mock the create method of userModel to return a new user
//       const newUser = {
//         _id: 'newUserId',
//         email: registerRequest.email,
//         role: 'user',
//       };
//       (userModel.create as jest.Mock).mockResolvedValue(newUser);

//       const createdUser = await userService.register(registerRequest);

//       expect(userModel.findOne).toHaveBeenCalledWith(
//         { email: registerRequest.email, isDeleted: false },
//         { address: 1, countryCode: 1, email: 1, firstName: 1, image: 1, profileStatus: 1, isBlocked: 1, kycCustomerId: 1, lastName: 1, password: 1, phone: 1, profilePictureId: 1, role: 1, saIdNo: 1, street: 1, userName: 1, zipCode: 1, });
//       expect(userModel.create).toHaveBeenCalledWith({
//         email: registerRequest.email,
//         password: expect.any(String),
//       });
//       expect(createdUser).toEqual(newUser);
//     });

//     it('should throw BadRequestException if user already exists', async () => {
//       // Mock the fetchUserByEmail function to return an existing user
//       const existingUser = {
//         _id: 'existingUserId',
//         email: 'existing@email.com',
//       };
//       (userModel.findOne as jest.Mock).mockResolvedValue(existingUser);

//       // Mock request data with an email that already exists
//       const preferredCredential: 'email' | 'phone' = 'email';
//       const registerRequest = {
//         email: existingUser.email,
//         password: 'password123',
//         role: 'user',
//         preferredCredential
//       };

//       await expect(userService.register(registerRequest)).rejects.toThrow(BadRequestException);
//     });
//   });

//   describe('updatePassword', () => {
//     it('should update the user password successfully', async () => {
//       // Mock user data
//       const userId = 'userId';
//       const newPassword = 'newPassword123';

//       const userToUpdate = {
//         _id: userId,
//         password: 'oldPasswordHash',
//         save: jest.fn().mockResolvedValue(true), // Mocking the save function
//       };

//       (userModel.findById as jest.Mock).mockResolvedValue(userToUpdate);

//       const updated = await userService.updatePassword(userId, newPassword);

//       expect(userModel.findById).toHaveBeenCalledWith(userId);
//       expect(userToUpdate.password).not.toEqual('oldPasswordHash');
//       expect(userToUpdate.save).toHaveBeenCalled();
//       expect(updated).toBe(true);
//     });

//     it('should throw BadRequestException if user to update does not exist', async () => {
//       // Mock the findById function to return null (indicating user doesn't exist)
//       (userModel.findById as jest.Mock).mockResolvedValue(null);

//       const userId = 'nonexistentUserId';
//       const newPassword = 'newPassword123';

//       await expect(userService.updatePassword(userId, newPassword)).rejects.toThrow(BadRequestException);
//     });
//   });


//   describe('getUser', () => {
//     it('should fetch user details by email successfully', async () => {
//       // Mock request data
//       const getUserRequest = {
//         email: 'user@example.com',
//       };

//       // Mock the fetchUserByEmail function to return a user
//       const user = {
//         _id: 'userId',
//         email: getUserRequest.email,
//       };
//       (userModel.findOne as jest.Mock).mockResolvedValue(user);

//       const fetchedUser = await userService.getUser(getUserRequest);

//       expect(userModel.findOne).toHaveBeenCalledWith(
//         { email: getUserRequest.email , isDeleted: false },
//         { address: 1, countryCode: 1, email: 1, firstName: 1, image: 1, profileStatus: 1, isBlocked: 1, kycCustomerId: 1, lastName: 1, password: 1, phone: 1, profilePictureId: 1, role: 1, saIdNo: 1, street: 1, userName: 1, zipCode: 1, });
//       expect(fetchedUser).toEqual({
//         _id: user._id,
//         email: user.email,
//       });
//     });

//     it('should return null if user does not exist for provided email', async () => {
//       // Mock the fetchUserByEmail function to return null (indicating user doesn't exist)
//       (userModel.findOne as jest.Mock).mockResolvedValue(null);

//       // Mock request data with an email that doesn't exist
//       const getUserRequest = {
//         email: 'nonexistentuser@example.com',
//       };

//       const fetchedUser = await userService.getUser(getUserRequest);

//       expect(fetchedUser).toBeNull();
//     });
//   });
// });
