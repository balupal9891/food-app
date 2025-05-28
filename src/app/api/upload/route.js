// import {PutObjectCommand, S3Client} from "@aws-sdk/client-s3";
// import uniqid from 'uniqid';
const cloudinary = require("cloudinary").v2;
import { uploadOnCloudinary } from "@/components/cloudinary";
import { writeFile } from "fs/promises";


cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET
});

export async function POST(req) {
  const data =  await req.formData();
  if (data.get('file')) {
    // upload the file
    const file = data.get('file');
    // console.log(file)
    const bytes = await file.arrayBuffer();
    // console.log(bytes)

    const buffer = Buffer.from(bytes)
    // console.log(buffer)

    const path = `./public/${file.name}`
    await writeFile(path, buffer);

    const response = await uploadOnCloudinary(path);
    console.log(response.url)

    // console.log(`${path}`);

    
    if(!response){
      return Response({});
    }



    const link = response?.url;
    return Response.json({imageUrl: link});
  // return Response.json(true);

  }
  return Response.json(true);
}