import { Document } from 'mongoose';

export enum AdminGroup {
  SUPER_ADMIN = 'SUPER_ADMIN',
  ADMIN = 'ADMIN',
}

export interface AdminInterface {
  username: string;
  password: string;
  email: string;
  isActive: number;
  isDelete: number;
  firstName: string;
  lastName: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  country: string;
  mobileNumber: string;
  adminGroup: AdminGroup;
}

export interface AdminModel extends Document, AdminInterface {}
