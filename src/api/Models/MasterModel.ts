import { Model, model, Schema } from 'mongoose';
import { ChatModel } from '../Interface/Chat.interface';

const chatSchema = new Schema({
  sender: {
    type: Array,
    require: true,
  },
  receiver: {
    type: String,
    require: true,
  },
});

export const chat: Model<ChatModel> = model<ChatModel>(
  'chat',
  chatSchema,
  'chat'
);
