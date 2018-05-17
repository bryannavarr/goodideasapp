const aws = require("aws-sdk");

module.exports = {
  signUrl: signUrl,
  uploadFile: uploadFile
};

const s3 = new aws.S3();

aws.config.update({
  accessKeyId: "...",
  secretAccessKey: "...",
  region: "us-west-2"
});

function signUrl(filename, filetype) {
  return new Promise((resolve, reject) => {
    const params = {
      Bucket: "...",
      Key: filename,
      Expires: 60,
      ContentType: filetype,
      ACL: "public-read"
    };

    s3.getSignedUrl("putObject", params, function(err, url) {
      if (err) {
        reject(err);
        console.log(err);
      } else {
        resolve(url);
      }
    });
  });
}

function uploadFile(fileName, body) {
  return new Promise((resolve, reject) => {
    const params = {
      Body: body,
      Bucket: "1931",
      Key: `${fileName}`
    };

    s3.upload(params, function(err, data) {
      debugger;
      if (err) {
        reject(err);
      } else {
        resolve(data.location);
      }
    });
  });
}
