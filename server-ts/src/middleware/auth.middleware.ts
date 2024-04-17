import { CanActivate, ExecutionContext } from '@nestjs/common';
import jwkToPem from 'jwk-to-pem';
import jwt from 'jsonwebtoken';
import fetch from 'node-fetch'
import { ConfigService } from '@nestjs/config';

interface JWKResponse {
  keys: {
    kid: string;
    n: string;
    e: string;
    kty: string;
  }[];
}

class AuthMiddleware implements CanActivate {
  private poolRegion: string = 'eu-west-1';
  private userPoolId: string = 'eu-west-1_vZOjcYgRx';
  private pems: { [key: string]: any } = {};

  constructor(
    private readonly configService: ConfigService
  ) {
    this.setUp();
  }

  private async refreshToken(refreshToken: string): Promise<string | null> {
    try {
      // const client = new CognitoIdentityProviderClient({ region: this.poolRegion });
      // const command = new InitiateAuthCommand({
      //   AuthFlow: 'REFRESH_TOKEN_AUTH',
      //   ClientId: this.configService.get<string>('AWS_APP_CLIENT_ID'),
      //   AuthParameters: {
      //     REFRESH_TOKEN: refreshToken,
      //     SECRET_HASH: this.configService.get<string>('AWS_APP_CLIENT_SECRET'),
      //   },
      // });

      // const response = await client.send(command);
      // const newAccessToken = response.AuthenticationResult?.AccessToken;

      // return newAccessToken || null;
      return null;
    } catch (error) {
      console.error('Error refreshing token:', error);
      return null;
    }
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const authHeader = req.headers['auth'];

    if (!authHeader) {
      return false;
    }

    const token = authHeader as string;

    try {
      const decodedJwt: any = jwt.decode(token, { complete: true });
      if (decodedJwt === null) {
        return false;
      }

      const kid = decodedJwt.header.kid;
      const pem = this.pems[kid];

      if (!pem) {
        return false;
      }

      return new Promise<boolean>(async (resolve, reject) => {
        jwt.verify(token, pem, async (err: any, payload: any) => {
          if (!err) {
            resolve(true);
          }
          if (err.name !== 'TokenExpiredError') {
            resolve(false);
          }

          const refreshToken = req.headers['refresh-token'];

          if (!refreshToken) {
            resolve(false);
          }

          const newAccessToken = await this.refreshToken(refreshToken);

          if (!newAccessToken) {
            resolve(false);
          }

          req.headers['auth'] = newAccessToken;
          const newDecodedJwt: any = jwt.decode(newAccessToken, { complete: true });

          if (!newDecodedJwt) {
            resolve(false);
          }

          const newKid = newDecodedJwt.header.kid;
          const newPem = this.pems[newKid];

          if (!newPem) {
            resolve(false);
          }

          jwt.verify(newAccessToken, newPem, (verifyErr: any, verifyPayload: any) => {
            if (!verifyErr) {
              resolve(true);
            }
          });
        });
      });
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  private async setUp() {
    const URL = `https://cognito-idp.${this.poolRegion}.amazonaws.com/${this.userPoolId}/.well-known/jwks.json`;

    try {
      const response = await fetch(URL);

      if (response.status !== 200) {
        throw new Error('Request not successful');
      }

      const data: { keys?: JWKResponse['keys'] } = await response.json();
      const { keys } = data;

      if (!keys) {
        throw new Error('Keys are missing in the response');
      }

      for (let i = 0; i < keys.length; i++) {
        const keyId = keys[i].kid;
        const modulus = keys[i].n;
        const exponent = keys[i].e;
        const keyType = keys[i].kty;
        const jwk = { kty: keyType, n: modulus, e: exponent };
        // const pem = jwkToPem(jwk);
        // this.pems[keyId] = pem;
      }
    } catch (error) {
      console.error(error);
      console.error('Error! Unable to download JWKs');
    }
  }
}

export default AuthMiddleware;
