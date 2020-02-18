'use strict';

const AWS = require('aws-sdk')

const BUCKET_NAME = process.env.BUCKET_NAME
const s3 = new AWS.S3()

module.exports.handler = async ({ Records }) => {
  for (const record of Records) {
    const filename = record.s3.object.key
    await s3.deleteObject({
      Bucket: BUCKET_NAME,
      Key: filename.replace('images/', 'thumbnails/')
    }).promise()
  }
  return {
    message: 'File has been deleted.'
  }
};
