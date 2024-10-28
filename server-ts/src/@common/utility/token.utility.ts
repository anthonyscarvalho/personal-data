import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as process from 'process';

@Injectable()
export class TokenUtility {
  JwtExpiryDurationInMinutes = 30;

  constructor(private jwtService: JwtService) { }

  jwtSign(payload) {
    try {
      return this.jwtService.sign(
        {
          data: payload,
        },
        {
          secret: process.env.JWT_ACCESS_SECRET,
          expiresIn: this.JwtExpiryDurationInMinutes * 60,
        },
      );
    } catch (error) {
      throw error;
    }
  }

  getExpiryDuration() {
    return this.JwtExpiryDurationInMinutes;
  }

  getRefreshToken(payload) {
    // eslint-disable-next-line no-useless-catch
    try {
      return this.jwtService.sign(payload, {
        secret: process.env.JWT_REFRESH_SECRET,
        expiresIn: '7d',
      });
    } catch (error) {
      throw error;
    }
  }
}
