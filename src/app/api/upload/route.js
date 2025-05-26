// import {PutObjectCommand, S3Client} from "@aws-sdk/client-s3";
import uniqid from 'uniqid';
import { v2 as cloudinary } from 'cloudinary'

export async function POST(req) {
  const data =  await req.formData();
  console.log(req.json())
  console.log(data)
  if (data.get('file')) {
    // upload the file
    const file = data.get('file');
    console.log(file)

    cloudinary.config({ 
  cloud_name: "balupal", 
  api_key: "149697261223532", 
  api_secret: "e8OULbU3jhCtnTzjWWu8ii9h4Z8"
});

  const response = await  cloudinary.uploader
  .upload(file, {
            resource_type: "auto"
        });
  // .then(result=>console.log(result));
  console.log(response)

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

    const link = 'https://'+bucket+'.s3.amazonaws.com/'+newFileName;
    return Response.json(true);
  }
  return Response.json(true);
}