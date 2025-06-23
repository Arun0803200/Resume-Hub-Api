import { Model, model, Schema } from 'mongoose';
import { AdminModel } from '../Interface/AdminUser.interface';
import { AdminGroup } from '../Interface/AdminUser.interface';
const optionalSchema: object = {
  timestamp: {
    createdAt: 'createdOn',
    updatedAt: 'updatedAt',
  },
};

const AdminSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    adminGroup: {
      type: AdminGroup,
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
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: false,
    },
    address1: {
      type: String,
      required: true,
    },
    address2: {
      type: String,
      required: false,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    mobileNumber: {
      type: String,
      required: false,
    },
  },
  optionalSchema
);

export const Admin: Model<AdminModel> = model<AdminModel>(
  'AdminSchema',
  AdminSchema,
  'AdminSchema'
);
