import {
  Body,
  Controller,
  Post,
  Get,
  Res,
  UseGuards,
  HttpException,
} from '@nestjs/common';
import { UserService } from './user.service';
import {
  GetUserRequest,
  UserLoginRequest,
  UserRegisterRequest,
  ForgotPasswordRequest,
  NewPasswordRequest,
  LogoutRequest,
  UploadDocumentRequest,
  VerifyDocumentRequest,
  UserConfirmationKYCRequest,
  SetPasswordKYCRequest,
} from './schema/user.api.request';
import { BaseController } from '../@common/base.controller';
import { HTTP_RESPONSE_CODES } from '../utility/constants.utility';
import { I18nService } from 'nestjs-i18n';
import AuthMiddleware from '../middleware/auth.middleware';
import { User } from '@user/schema/user.dto';
import {
  hashPassword,
  validatePassword,
} from '../utility/validator.utility';
import {
  ApiTags,
  ApiOperation,
  ApiBody,
  ApiResponse,
  ApiQuery,
} from '@nestjs/swagger';
import { LoggingService } from '../@common/services/log.service';
import { ConfigService } from '@nestjs/config';

@ApiTags('User')
@Controller('v1/user')
export class UserController extends BaseController {
  constructor(
    i18n: I18nService,
    private readonly userService: UserService,
    private log: LoggingService,
  ) {
    super(i18n);
  }

  @Get('/health')
  getMain(): object {
    return { status: 'operational' };
  }

  @ApiOperation({ summary: 'Login' })
  // @ApiBody({ type: UserLoginRequestDto })
  @ApiResponse({ status: 200, description: 'Successful Login' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @Post('/login')
  async login(@Body() request: UserLoginRequest) {
    try {
      let userName = '';

      if (request.email) {
        userName = request.email;
      } else if (request.phone && request.countryCode) {
        userName = `+${request.countryCode}${request.phone}`;
      } else {
        this.returnSuccess(this.getLocalization('login', 'missing_phone_email'));
      }

      const { password, deviceType, deviceToken } = request;
      // const success = await this.cognitoService.login(
      //   userName,
      //   request.password,
      // );
      const success = true;

      if (success) {
        const loginResponse = await this.userService.login(request);
        const {
          id,
          role,
          email,
          phone,
          govIssuedIdentificationId,
          profileStatus,
          profilePictureId,
          countryCode,
          isBlocked,
        } = loginResponse;


        const profile = await this.userService.fetchUserById(id);

        const combinedResponse = {
          ...profile.toObject(),
        };

        return this.returnSuccess(combinedResponse);
      } else {
        this.returnSuccess(this.getLocalization('login', 'invalid_credentials'));
      }
    } catch (error) {
      throw error;
    }
  }

  @Post('/register')
  @ApiOperation({ summary: 'Register' })
  // @ApiBody({ type: UserRegisterRequestDto })
  @ApiResponse({ status: 200, description: 'Successful Registration' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async register(@Body() request: UserRegisterRequest) {

  }

  @Post('/forgot')
  @ApiOperation({ summary: 'Forgot Password' })
  // @ApiBody({ type: ForgotPasswordRequestDto })
  @ApiResponse({ status: 200, description: 'Email Sent for Password Reset' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  async forgot(@Body() request: ForgotPasswordRequest) {

  }

  @Post('/confirm-new-password')
  @ApiOperation({ summary: 'Confirm New Password' })
  // @ApiBody({ type: NewPasswordRequestDto })
  @ApiResponse({ status: 200, description: 'Password Confirmed and Updated' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async confirmNewPassword(@Body() request: NewPasswordRequest) {

  }

  @Post('/logout')
  @ApiOperation({ summary: 'Logout' })
  // @ApiBody({ type: LogoutRequestDto })
  @ApiResponse({ status: 200, description: 'Logged Out Successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async logout(@Body() request: LogoutRequest) {

  }

  // Apply AuthMiddleware to protect the /user route
  @Get('/user')
  //@UseGuards(new AuthMiddleware(new ConfigService()))
  @ApiOperation({ summary: 'Get User' })
  // @ApiQuery({ type: GetUserRequestDto })
  @ApiResponse({ status: 200, description: 'User Data Retrieved Successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async user(@Body() request: GetUserRequest) {

  }

  @Post('/upload-document')
  //@UseGuards(new AuthMiddleware(new ConfigService()))
  @ApiOperation({ summary: 'Upload Document KYC' })
  // @ApiBody({ type: UploadDocumentRequestDto })
  @ApiResponse({
    status: 200,
    description: 'Successful Document Upload for KYC',
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async uploadDocument(@Body() request: UploadDocumentRequest) {

  }
}
