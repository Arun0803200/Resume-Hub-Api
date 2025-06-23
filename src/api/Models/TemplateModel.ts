import { Model, model, Schema } from 'mongoose';
import { AdminUserModel } from '../Interface/AdminUser.interface';

export const optionalaSchma: object = {
  timestamp: {
    createdAt: 'createdOn',
    updatedAt: 'updatedOn',
  },
};

export const adminUserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    slugName: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    isActive: {
      type: Number,
      required: true,
    },
    isDelete: {
      type: Number,
      required: true,
    },
  },
  optionalaSchma
);

export const adminUserModels: Model<AdminUserModel> = model<AdminUserModel>(
  'adminUserSchema',
  adminUserSchema,
  'adminUserSchema'
);
