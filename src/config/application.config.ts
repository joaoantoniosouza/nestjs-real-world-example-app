import { registerAs } from '@nestjs/config';

export const applicationConfig = registerAs('application', () => ({
  port: process.env.PORT || 3000,
  jwt: {
    secret: process.env.SECRET,
    verifyOptions: {
      ignoreExpiration: false,
    },
    signOptions: {
      expiresIn: '60m',
    },
  },
}));
