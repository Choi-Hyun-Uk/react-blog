const AWS = require('aws-sdk');
const sharp = require('sharp');

// AWS 자체에서 진행되기 때문에 따로 권한 검사는 없다.
const s3 = new AWS.S3();

// event - S3에서 작업 진행 
exports.imageHandler = async (event, context, callback) => {
  const Bucket = event.Records[0].s3.bucket.name; // react-blog-s3
  const Key = decodeURIComponent(event.Records[0].s3.object.key.replace(/\+/g, " ")); // original/12312312_abc.png
  console.log('Bucket',Bucket, 'Key', Key);
  const filename = Key.split('/')[1]; // original/12312312_abc.png -> [0]original / [1]12312312_abc.png
  const ext = filename.match(/\.([^.]*)$/)[1]; // . 제외한 확장자명
  console.log('filename', filename, 'ext', ext);

  if (ext !== 'jpg' && ext !== 'png' && ext !== 'gif') {
    return console.log(`${ext} 확장자를 지원하지 않습니다. jpg, png, gif 확장자로 이용해주세요.`)
  }

  try {
    const s3Object = await s3.getObject({ Bucket, Key }).promise();
    console.log('original body', s3Object.Body);
    console.log('original body length', s3Object.Body.length);
    const resizedImage = await sharp(s3Object.Body)
      .resize(400, 400, { fit: 'inside' })
      .toBuffer();
    console.log('resizedImage', resizedImage);
    await s3.putObject({
      Bucket,
      Key: `thumb/${filename}`,
      Body: resizedImage,
    }).promise();
    console.log('put', resizedImage.length);
    return callback(null, `thumb/${filename}`);
  } catch (error) {
    console.error(error)
    return callback(error);
  }
}