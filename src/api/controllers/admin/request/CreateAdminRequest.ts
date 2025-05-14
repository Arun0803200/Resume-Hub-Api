import { IsEmail, IsNotEmpty } from 'class-validator';
import { AdminData } from '../../../models/AdminModel';
export class CreateAdminRequest {
  @IsEmail({}, { message: 'Given Email is not valid' })
  @IsNotEmpty({ message: 'Email address is required' })
  public email: string;

  @IsNotEmpty({ message: 'Password is required' })
  public password: string;

  @IsNotEmpty({ message: 'Compare Password is required' })
  public comparePassword: string;

  @IsNotEmpty({ message: 'Mobile Number is required' })
  public mobileNumber: string;

  public adminData: AdminData;
}
