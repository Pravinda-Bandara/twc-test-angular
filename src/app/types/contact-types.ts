import mongoose from "mongoose";

export enum Gender {
  MALE = "male",
  FEMALE = "female"
}
export interface ContactRequest {
  number: string;
  name: string;
  email: string;
  gender: Gender;
  user: string;
}

export interface ContactResponse {
  _id: mongoose.Types.ObjectId | undefined |string ;
  number: string;
  name: string;
  email: string;
  gender: Gender;
}
