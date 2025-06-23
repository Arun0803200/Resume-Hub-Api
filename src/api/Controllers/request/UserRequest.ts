import { IsNotEmpty } from 'class-validator';

export class UserRequest {
  @IsNotEmpty({
    message: 'password should not be empty',
  })
  public password: string;

  @IsNotEmpty({
    message: 'comparePassword should not be empty',
  })
  public comparePassword: string;

  @IsNotEmpty({
    message: 'email should not be empty',
  })
  public email: string;

  @IsNotEmpty({
    message: 'firstName sholud not be empty',
  })
  public firstName: string;
  public lastName: string;
  public address1: string;
  public address2: string;
  public city: string;
  public state: string;
  public country: string;
  @IsNotEmpty({
    message: 'mobileNumber should not be empty',
  })
  public mobileNumber: string;
}
