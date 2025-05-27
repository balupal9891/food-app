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

    // const s3Client = new S3Client({
    //   region: 'us-east-1',
    //   credentials: {
    //     accessKeyId: process.env.MY_AWS_ACCESS_KEY,
    //     secretAccessKey: process.env.MY_AWS_SECRET_KEY,
    //   },
    // });
    

    // const ext = file.name.split('.').slice(-1)[0];
    // const newFileName = uniqid() + '.' + ext;

    // const chunks = [];
    // for await (const chunk of file.stream()) {
    //   chunks.push(chunk);
    // }
    // const buffer = Buffer.concat(chunks);

    // const bucket = 'dawid-food-ordering';
    // await s3Client.send(new PutObjectCommand({
    //   Bucket: bucket,
    //   Key: newFileName,
    //   ACL: 'public-read',
    //   ContentType: file.type,
    //   Body: buffer,
    // }));

    // const response = await cloudinary.uploader.upload_stream(file, {
    //         resource_type: "auto"
    //     })
    //     console.log(response)




    const link = response?.url;
    return Response.json({imageUrl: link});
  // return Response.json(true);

  }
  return Response.json(true);
}