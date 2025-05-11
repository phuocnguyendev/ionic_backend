import { IUser } from "src/module/user/interface/IUser";

export type IUserResponse = {
    Item: IUser[];
    count: number;
}
  