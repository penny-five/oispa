/* eslint-disable import/no-extraneous-dependencies */
require('dotenv').config();
const glob = require('glob');
const s3 = require('s3');
/* eslint-enable import/no-extraneous-dependencies */

if (process.env.AWS_ACCESS_KEY_ID == null) {
  throw new Error('Missing environment variable AWS_ACCESS_KEY_ID');
}
if (process.env.AWS_SECRET_ACCESS_KEY == null) {
  throw new Error('Missing environment variable AWS_SECRET_ACCESS_KEY');
}
if (process.env.AWS_BUCKET_NAME == null) {
  throw new Error('Missing environment variable BUCKET_NAME');
}

const client = s3.createClient({
  s3Options: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  }
});

const createUploadTask = asset => new Promise((resolve, reject) => {
  const params = {
    localFile: asset,
    s3Params: {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: asset.substr(asset.indexOf('/') + 1)
    }
  };
  const uploader = client.uploadFile(params);
  uploader.on('error', reject);
  uploader.on('end', () => {
    console.log(`Uploaded ${asset}`);
    resolve();
  });
});

glob('dist/**/*', {}, (err, assets) => {
  if (err) throw err;

  const uploadTasks = assets.map(createUploadTask);

  Promise.all(uploadTasks).then(() => {
    console.log('Upload finished.');
  }).catch(err => {
    console.error('Upload failed', err);
  });
});
