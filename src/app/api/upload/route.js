// import {PutObjectCommand, S3Client} from "@aws-sdk/client-s3";
// import uniqid from 'uniqid';

export async function POST(req) {
  const data =  await req.formData();
  console.log(req.json())
  console.log(data)
  if (data.get('file')) {
    // upload the file
    const file = data.get('file');
    console.log(file)

    const ext = file.name.split('.').slice(-1)[0];
    const newFileName = uniqid() + '.' + ext;

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

//     const link = 'https://'+bucket+'.s3.amazonaws.com/'+newFileName;
    return Response.json(true);
  }
  return Response.json(true);
}