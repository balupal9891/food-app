import {User} from "@/models/User";

import bcrypt from "bcrypt";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function POST(req, res) {
    // console.log("yes")
  const body = await req.json();
  // console.log(body)
  mongoose.connect(process.env.MONGO_URL);

  // let userExist = await User.find({email: body.email});
  // if (userExist) {
  //   return NextResponse.json({error: "user exist"});
  // }
  
  const pass = body.password;
  if (!pass?.length || pass.length < 5) {
    new Error('password must be at least 5 characters');
  }

  const notHashedPassword = pass;
  const salt = bcrypt.genSaltSync(10);
  body.password = bcrypt.hashSync(notHashedPassword, salt);

  const createdUser = await User.create(body);
  
  return NextResponse.json({success: "success"});
}