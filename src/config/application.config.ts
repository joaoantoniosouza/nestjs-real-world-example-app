import { registerAs } from '@nestjs/config';

export const applicationConfig = registerAs('application', () => ({
  port: process.env.PORT || 3000,
}));
