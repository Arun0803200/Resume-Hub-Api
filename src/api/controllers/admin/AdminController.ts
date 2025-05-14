import {
  Body,
  Get,
  JsonController,
  Post,
  QueryParam,
  QueryParams,
  Res,
} from 'routing-controllers';
import { CreateAdminRequest } from './request/CreateAdminRequest';
import { AdminModel } from '../../models/AdminModel';
import { AdminService } from '../../services/AdminService';
import { AdminListRequest } from './request/AdminListRequest';
@JsonController('/admin')
export class AdminController {
  constructor(private AdminService: AdminService) {}

  @Post()
  public async creaeAdmin(
    @Body({ validate: true }) payload: CreateAdminRequest,
    @Res() response: any
  ): Promise<any> {
    try {
      const where = (qb) => {
        qb.where(`admin_data ->> 'isActive' = :isActive`, {
          isActive: 1,
        }).andWhere('email = :email', { email: payload.email });
      };

      const findEmailIsExist = await this.AdminService.findOne({
        where,
      });

      if (findEmailIsExist) {
        return response.status(400).send({
          status: 0,
          message:
            'The provided email address already exists. Please enter a different one',
        });
      }

      const hashPassword: any = await AdminModel.hashPassword(payload.password);
      const comparePassword = await AdminModel.comparePassword(
        payload.comparePassword,
        hashPassword
      );

      if (!comparePassword) {
        return response.status(400).send({
          status: 0,
          message:
            'Please provide the password and ensure that it matches the confirmation password',
        });
      }
      const newAdmin = new AdminModel();
      newAdmin.email = payload.email;
      newAdmin.password = hashPassword;
      newAdmin.mobileNumber = payload.mobileNumber;
      newAdmin.adminData = payload.adminData;
      const saveAdminData = await this.AdminService.create(newAdmin);
      return response.status(200).send({
        status: 1,
        message: 'Admin data has been successfully created',
        data: saveAdminData,
      });
    } catch (error) {
      console.log('error:', error);
      return response.status(500).send({
        status: 0,
        message: 'Failed to create the admin due to an unexpected error',
        error,
      });
    }
  }

  @Get()
  public async adminList(
    @QueryParams() payload: AdminListRequest,
    @QueryParam('count') count: number | boolean,
    @Res() response: any
  ): Promise<any> {}
}
