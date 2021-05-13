import { Schema, model, Types } from 'mongoose';
import { CodeGround } from './CodeGround';

const userSchema = new Schema(
  {
    _id: Types.ObjectId,
    username: {
      type: String,
      unique: true,
      required: true,
      maxLength: 50,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minLength: 8,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
    avatar: {
      originalname: { type: String },
      path: {
        type: String,
        default:
          'https://res.cloudinary.com/doh6rpdke/image/upload/w_200,h_200/v1620665635/Gouda-Chess/assets/avatar-1577909_960_720_r9xjzp_aobufm.webp',
      },
      cloudinaryId: { type: String },
    },
    favourites: [
      {
        type: Types.ObjectId,
        ref: 'CodeGround',
      },
    ],
    codeGrounds: [
      {
        type: Types.ObjectId,
        ref: 'CodeGround',
      },
    ],
  },
  { timestamps: true },
);

export interface User extends Document {
  username: string;
  password: string;
  email: string;
  role: string;
  avatar: {
    originalname: string;
    path: string;
    cloudinaryId: string;
  };
  favourites: Types.Array<Types.ObjectId>;
  codeGrounds: Types.Array<Types.ObjectId>;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserPopulatedFavourites extends Omit<User, 'favourites'> {
  favourites: Types.Array<CodeGround>;
}

export interface UserPopulatedCodeGrounds extends Omit<User, 'codeGrounds'> {
  codeGrounds: Types.Array<CodeGround>;
}

export default model('User', userSchema);
