import { Schema, model } from 'mongoose';
import { User } from './User';

const codeGroundSchema = new Schema(
  {
    title: {
      type: String,
      default: 'untitled',
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    html: {
      type: String,
    },
    css: {
      type: String,
    },
    js: {
      type: String,
    },
    forked: {
      type: Boolean,
      default: false,
    },
    creator: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
  },
  { timestamps: true },
);

export interface CodeGround {
  title: string;
  user: Schema.Types.ObjectId;
  html: string;
  css: string;
  js: string;
  forked: boolean;
  creator: Schema.Types.ObjectId | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface CodeGroundPopulated
  extends Omit<CodeGround, 'creator' | 'user'> {
  user: User;
  creator: User;
}

export default model('CodeGround', codeGroundSchema);
