import { Body, Controller, Post, Get } from '@nestjs/common';
import { UserService } from '../../services/user/user.service';
import { GetUserRequest, UserLoginRequest, UserRegisterRequest, ForgotPasswordRequest, NewPasswordRequest, LogoutRequest, UploadDocumentRequest } from '../../services/user/user.api.request';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

import { BaseController, LoggingService } from '@common';

@ApiTags('User')
@Controller('v1/user')
export class UserController extends BaseController {
  constructor(
    private readonly userService: UserService,
    private log: LoggingService,
  ) {
    super();
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
        this.returnSuccess('missing_phone_email');
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
        this.returnSuccess('invalid_credentials');
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
