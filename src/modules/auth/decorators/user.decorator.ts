import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { IUser } from 'src/interfaces/IUser';

export const ReqUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): IUser | null => {
    const request = ctx.switchToHttp().getRequest();
    return request.user ?? null;
  },
);
