import { Schema, model, Model, Document } from 'mongoose';
import { UserDocument } from './User';

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

export interface CodeGroundDocument extends Document {
  title: string;
  user: Schema.Types.ObjectId;
  html: string;
  css: string;
  js: string;
  forked: boolean;
  creator: Schema.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export interface CodeGroundPopulated
  extends Omit<CodeGroundDocument, 'creator' | 'user'> {
  user: UserDocument;
  creator: UserDocument;
}

export default model<CodeGroundDocument, Model<CodeGroundDocument>>(
  'CodeGround',
  codeGroundSchema,
);
