import {isAdmin} from "@/app/api/auth/[...nextauth]/route";
import {User} from "@/models/User";
import mongoose from "mongoose";

export async function GET() {
  mongoose.connect(process.env.MONGO_URL);
  if (await isAdmin()) {
    const users = await User.find();
    return Response.json(users);
  } else {
    return Response.json([]);
  }
}

export async function DELETE(req) {
  const url = new URL(req.url);
  const _id = url.searchParams.get('id');
  // console.log(_id)
  mongoose.connect(process.env.MONGO_URL);
  if (await isAdmin()) {
    const user = await User.findByIdAndDelete(_id);
    // console.log(user);
    return Response.json(user);
  } else {
    return Response.json({});
  }
}