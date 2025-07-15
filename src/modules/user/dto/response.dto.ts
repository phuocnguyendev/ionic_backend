import { BaseResponse } from 'src/common/dto/base-response.dto';
import { IUser } from 'src/interfaces/IUser';

export class IUserResponse extends BaseResponse<IUser> {
  constructor(data: IUser[], total: number) {
    super(data, total);
  }
}
