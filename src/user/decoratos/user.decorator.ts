import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const User = createParamDecorator(
  (data: any, context: ExecutionContext) => {
    const req = context.switchToHttp().getRequest();

    if (req.user) {
      return data ? req.user[data] : req.user;
    }

    return null;
  },
);
