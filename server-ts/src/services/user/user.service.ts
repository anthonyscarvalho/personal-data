import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { BaseService, LoggingService, hashPassword, isEmailAddress, isPhoneNumber, validatePassword } from '@common';
import { UserLoginRequest, UserRegisterRequest, GetUserRequest } from './user.api.request';
import { DefaultUserProjection, User } from './user.dto';

@Injectable()
export class UserService extends BaseService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    log: LoggingService,
  ) {
    super(log);
  }

  // region ####### Login #######
  async login(request: UserLoginRequest) {
    let user;
    const password = request.password;
    delete request.password;
    this.log.info('Login Request', request);

    if (request.email && isEmailAddress(request.email)) {
      await this.updateProfileStatusByEmail(request.email, request.profileStatus)
      user = await this.fetchUserByEmail(request.email);
    } else if (request.phone && isPhoneNumber(request.phone)) {
      await this.updateProfileStatusByPhone(request.phone, request.countryCode, request.profileStatus)
      user = await this.fetchUserByPhone(request.phone, request.countryCode);
    } else {
      throw new BadRequestException('no_login_identifier');
    }

    this.log.info('Retrieved User', user);

    if (!user) {
      throw new UnauthorizedException('invalid_credentials');
    }

    const match = validatePassword(password, user.password);

    if (!match) {
      throw new UnauthorizedException('invalid_credentials');
    }

    if (user.isBlocked) {
      throw new UnauthorizedException('user_blocked');
    }

    return user;
  }

  async fetchUserDocuments(user, data) {
    const setObj = {
      deviceType: data.deviceType,
      deviceToken: data.deviceToken,
    };

    await this.userModel.findOneAndUpdate({ _id: user._id }, setObj, {
      new: true,
    });

    [user] = await this.userModel
      .aggregate()
      .lookup({
        from: 'userdocuments',
        localField: '_id',
        foreignField: 'userId',
        as: 'userdocuments',
      })
      .exec();

    return user;
  }

  async fetchUserByEmail(email: string) {
    return this.userModel
      .findOne(
        {
          isDeleted: false,
          email: email,
        },
        DefaultUserProjection,
      );
  }

  async fetchUserByKycId(kycId: string) {
    return this.userModel
      .findOne(
        {
          isDeleted: false,
          kycId: kycId,
        },
        DefaultUserProjection,
      );
  }

  async fetchUserById(userId: string) {
    return this.userModel
      .findOne(
        {
          isDeleted: false,
          _id: userId,
        },
        DefaultUserProjection,
      );
  }

  async fetchUserByEmailComplete(email: string) {
    return this.userModel
      .findOne(
        {
          isDeleted: false,
          email: email,
        },
      );
  }

  async fetchUserByPhone(phoneNumber: string, countryCode?: string) {
    return this.userModel
      .findOne(
        {
          isDeleted: false,
          phone: phoneNumber,
          ...(countryCode && { countryCode: countryCode }),
        },
        DefaultUserProjection,
      );
  }

  async fetchUserByPhoneComplete(phoneNumber: string, countryCode?: string) {
    return this.userModel
      .findOne(
        {
          isDeleted: false,
          phone: phoneNumber,
          ...(countryCode && { countryCode: countryCode }),
        },
      );
  }

  //endregion

  // region ####### Register ######

  async register(request: UserRegisterRequest) {
    let user;
    const hashedPassword = hashPassword(request.password);
    delete request.password;

    if (request.email && isEmailAddress(request.email)) {
      user = await this.fetchUserByEmail(request.email);
    } else if (request.phone && isPhoneNumber(request.phone)) {
      user = await this.fetchUserByPhone(request.phone, request.countryCode);
    } else {
      throw new BadRequestException('no_login_identifier');
    }

    if (user) {
      throw new BadRequestException('user_email_already_exists');
    }

    const response = this.userModel.create({
      email: request.email,
      password: hashedPassword,
      phone: request.phone,
      countryCode: request.countryCode,
      fullName: request.fullName,
      userName: request.userName,
      firstName: request.firstName,
      lastName: request.lastName,
      saIdNo: request.saIdNo,
      image: request.image,
      street: request.street,
      address: request.address,
      zipCode: request.zipCode
    });

    console.log(response);

    this.log.info('User Created', response);

    return response;
  }

  // endregion

  // region ####### Update Password ######

  async updatePassword(userId: string, newPassword: string): Promise<boolean> {
    try {
      const hashedPassword = hashPassword(newPassword);

      const userToUpdate = await this.userModel.findById(userId);

      if (!userToUpdate) {
        throw new BadRequestException('no_login_identifier');
      }

      userToUpdate.password = hashedPassword;
      await userToUpdate.save();

      return true;
    } catch (error) {
      throw new BadRequestException('password_update_failure');
    }
  }

  async updateKycCustomerId(userId: string, kycCustomerId: string) {
    const userToUpdate = await this.userModel.findById(userId);

    userToUpdate.kycCustomerId = kycCustomerId;
    await userToUpdate.save();
  }

  // Update password using email instead of userId
  async updatePasswordByEmail(email: string, newPassword: string): Promise<boolean> {
    try {
      const hashedPassword = hashPassword(newPassword);

      const userToUpdate = await this.fetchUserByEmailComplete(email);

      if (!userToUpdate) {
        throw new BadRequestException('no_login_identifier');
      }

      userToUpdate.password = hashedPassword;
      await userToUpdate.save();

      return true;
    } catch (error) {
      throw new BadRequestException('password_update_failure');
    }
  }

  async updatePasswordByPhone(countryCode: string, phone: string, newPassword: string): Promise<boolean> {
    try {
      const hashedPassword = hashPassword(newPassword);

      const userToUpdate = await this.fetchUserByPhoneComplete(phone, countryCode);

      if (!userToUpdate) {
        throw new BadRequestException('no_login_identifier');
      }

      userToUpdate.password = hashedPassword;
      await userToUpdate.save();

      return true;
    } catch (error) {
      throw new BadRequestException('password_update_failure');
    }
  }

  // endregion

  async updateProfileStatusByEmail(email: string, newStatus: number): Promise<boolean> {
    try {
      const userToUpdate = await this.fetchUserByEmailComplete(email);

      if (!userToUpdate) {
        throw new BadRequestException('no_login_identifier');
      }

      if (newStatus > userToUpdate.profileStatus) {
        userToUpdate.profileStatus = newStatus;
        await userToUpdate.save();
      }

      return true;
    } catch (error) {
      throw new BadRequestException('profile_status_update_failure');
    }
  }

  async updateProfileStatusByPhone(countryCode: string, phone: string, newStatus: number): Promise<boolean> {
    try {
      const userToUpdate = await this.fetchUserByPhoneComplete(phone, countryCode);

      if (!userToUpdate) {
        throw new BadRequestException('no_login_identifier');
      }

      if (newStatus > userToUpdate.profileStatus) {
        userToUpdate.profileStatus = newStatus;
        await userToUpdate.save();
      }

      return true;
    } catch (error) {
      throw new BadRequestException('profile_status_update_failure');
    }
  }

  async updateProfileStatusByUserId(userId: string, newStatus: number): Promise<boolean> {
    try {
      const userToUpdate = await this.fetchUserById(userId);

      if (!userToUpdate) {
        throw new BadRequestException('no_login_identifier');
      }

      if (newStatus > userToUpdate.profileStatus) {
        userToUpdate.profileStatus = newStatus;
        await userToUpdate.save();
      }

      return true;
    } catch (error) {
      this.log.error("Error Updating Profile State", error.response);
      throw new BadRequestException('profile_status_update_failure');
    }
  }

  // region ####### Get User ######

  async getUser(request: GetUserRequest) {
    let user;

    if (request.email && isEmailAddress(request.email)) {
      user = await this.fetchUserByEmail(request.email);
    } else if (request.phone && isPhoneNumber(request.phone)) {
      user = await this.fetchUserByPhone(request.phone, request.countryCode);
    }

    if (!user) {
      return null; // Return null if user is not found
    }

    return {
      _id: user._id,
      role: user.role,
      email: user.email,
      phone: user.phone,
      govIssuedIdentificationId: user.govIssuedIdentificationId,
      profilePictureId: user.profilePictureId,
      countryCode: user.countryCode,
      profileStatus: user.profileStatus,
      isBlocked: user.isBlocked,
      id: user.id
    };
  }

  // endregion

  // region ####### Get User Registration Confirmation Complete Information ######

  async getRegistrationConfirmationUser(request: UserRegisterRequest) {
    let user;

    if (request.email && isEmailAddress(request.email)) {
      user = await this.fetchUserByEmailComplete(request.email);
    } else if (request.phone && isPhoneNumber(request.phone)) {
      user = await this.fetchUserByPhoneComplete(request.phone, request.countryCode);
    }

    if (!user) {
      return null; // Return null if user is not found
    }

    return user
  }

  // endregion
}
