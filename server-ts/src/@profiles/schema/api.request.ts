export interface ProfileLoginRequest {
  email?: string;
  phone?: string;
  countryCode?: string;
  password: string;
  profileStatus: number;
  role: string;
  deviceType: string;
  deviceToken: string;
}
