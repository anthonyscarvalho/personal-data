export interface UserLoginRequest {
  email?: string;
  phone?: string;
  countryCode?: string;
  password: string;
  profileStatus: number;
  role: string;
  deviceType: string;
  deviceToken: string;
}

export interface UserRegisterRequest {
  email?: string;
  phone?: string;
  countryCode?: string;
  password: string;
  fullName?: string;
  firstName?: string;
  lastName?: string;
  userName?: string;
  saIdNo?: string;
  image?: string;
  street?: string;
  address?: string;
  zipCode?: string;
  role: string;
  preferredCredential: 'email' | 'phone';
}

export interface UserConfirmationKYCRequest {
  email?: string;
  phone?: string;
  countryCode?: string;
  kycCode: string;
  password?: string;
  deviceType?: string;
  deviceToken?: string;
}

export interface SetPasswordKYCRequest {
  kycPassword: string;
  kycToken: string;
}

export interface ForgotPasswordRequest {
  userName: string;
}

export interface NewPasswordRequest {
  email?: string;
  phone?: string;
  countryCode?: string;
  password: string;
  code: string;
}

export interface LogoutRequest {
  accessToken: string;
}

export interface GetUserRequest {
  email?: string;
  phone?: string;
  countryCode?: string;
}

export interface UploadDocumentRequest {
  imageData?: string;
  imageUrl?: string;
  userId: string;
  docType: string;
  kycToken: string;
  profileStatus?: number;
  isThumb_image?: boolean;
}

export interface VerifyDocumentRequest {
  imagePath: string;
  document: string;
  kycToken:string;
}
