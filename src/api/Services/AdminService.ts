import { Service } from 'typedi';
import { AdminRequest } from '../Controllers/Admin/Request/AdminRequest';
import { Admin } from '../Models/AdminUserModel';
import { BcryptService } from './BcryptService';
import { DeleteStatus, ActiveStatus } from '../../commpon';
@Service()
export class AdminService {
  constructor(private bcryptService: BcryptService) {}
  // services/admin.service.ts
  public async createAdmin(
    payload: AdminRequest
  ): Promise<{ status: number; message: string }> {
    const existingEmail = await Admin.findOne({
      email: payload.email,
      isDelete: 0,
    });
    if (existingEmail) throw new Error('Email already exists.');

    const existingMobile = await Admin.findOne({
      mobileNumber: payload.mobileNumber,
      isDelete: 0,
    });
    if (existingMobile) throw new Error('Mobile number already exists.');

    const hashPassword = await this.bcryptService.hashPassword(
      payload.password
    );
    const isMatch = await this.bcryptService.comparePassword(
      payload.comparePassword,
      hashPassword
    );
    if (!isMatch)
      throw new Error('Password and Confirm Password do not match.');

    const admin = new Admin();
    Object.assign(admin, {
      username: payload.email,
      password: hashPassword,
      email: payload.email,
      isActive: ActiveStatus.Active,
      isDelete: DeleteStatus.NotDeleted,
      ...payload,
    });
    await admin.save();

    return { status: 1, message: 'Successfully saved the admin data :)' };
  }
}
