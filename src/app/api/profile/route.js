import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import {User} from "@/models/User";
import { UserInfo } from "@/models/UserInfo";
import mongoose from "mongoose";
import {getServerSession} from "next-auth";

export async function PUT(req) {
  mongoose.connect(process.env.MONGO_URL);
  const data = await req.json();
  const {_id, name, image , ...otherUserInfo} = data;

  let filter = {}
  if(_id){
    filter = {id}
  }else{
    let session = await getServerSession(authOptions);
    const email = session.user.email
    filter = {email}
  }

  const user = await User.findOne(filter)
  await User.updateOne(filter, {name, image})
  const userInfo = await UserInfo.findOneAndUpdate({email: user?.email}, otherUserInfo, {upsert : true})
// console.log(userInfo)
  return Response.json(true)
}

export async function GET(req) {

  mongoose.connect(process.env.MONGO_URL)
  let url = new URL(req.url);
  const _id = url.searchParams.get('_id');

  let filter = {};
  if(_id){
    filter = {_id};
  }
  else{
      const session = await getServerSession(authOptions);
      const email = session?.user.email;
      if(!email){
        return Response.json({});
      }
      filter = {email}
  }
  
  const user = await User.findOne(filter).lean();
  const userInfo = await UserInfo.findOne(filter).lean();
  // console.log(user, userInfo)

  return Response.json({...user, ...userInfo});


}