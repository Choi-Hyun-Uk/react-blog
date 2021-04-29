const AWS = require('aws-sdk');
const sharp = require('sharp');

// AWS 자체에서 진행되기 때문에 따로 권한 검사는 없다.
const s3 = new AWS.S3();

// event - S3에서 작업 진행 
exports.handler = (event, context, callback) => {
    const Bucket = event.Records[0].s3.bucket.name; // 개인 버켓 이름
    const Key = decodeURIComponent(event.Records[0].s3.object.key);
    console.log(Bucket, key);
    const filename = Key.split('/')[Key.split('/').length -1];
    const ext = Key.split('.')[Key.split('.').legnth -1].toLowerCase();
    const requireFormat = ext === 'jpg' ? 'jpeg' : ext;
    console.log('filename', filename, 'ext', ext);

    try {
        const s3Object = await s3.getObject({ Bucket, Key }).promise();
        console.log('original', s3Object.Body.length);
        const resizedImage = await sharp(s3Object.Body)
            .resize(400, 400, { fit: 'inside'})
            .toFormat(requireFormat)
            .toBuffer();
        await s3.putObject({
            Bucket,
            Key: `thumb/${filename}`,
            Body: resizedImage,
        }).promise();
        console.log('put', resizedImage.length);
        return callback(null, `thumb/${filename}`);
    } catch(error) {
        console.error(error);
        return callback(error);
    }
}