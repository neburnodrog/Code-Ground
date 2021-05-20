import { Schema, model, Model, Document, Types } from 'mongoose';
import { UserDocument } from './User';

const codeGroundSchema = new Schema(
  {
    title: {
      type: String,
      default: 'untitled',
      required: true,
      maxLength: 30,
    },
    user: {
      type: Types.ObjectId,
      ref: 'User',
      required: true,
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
      type: Types.ObjectId,
      ref: 'User',
    },
    comments: [
      {
        comment: {
          type: String,
          maxLength: 200,
          required: true,
        },
        user: {
          type: Types.ObjectId,
          ref: 'User',
          required: true,
        },
        likes: [
          {
            type: Types.ObjectId,
            ref: 'User',
          },
        ],
      },
    ],
    likes: [
      {
        type: Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  { timestamps: true },
);

export interface CodeGroundDocument extends Document {
  title: string;
  user: string;
  html: string;
  css: string;
  js: string;
  forked: boolean;
  creator: string;
  comments: {
    comment: string;
    user: string;
    likes: Types.Array<Types.ObjectId>;
  }[];
  likes: Types.Array<Types.ObjectId>;
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
