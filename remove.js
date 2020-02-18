'use strict';

const AWS = require('aws-sdk')

const BUCKET_NAME = process.env.BUCKET_NAME
const s3 = new AWS.S3()

module.exports.handler = async ({ Records }) => {
  for (const record of Records) {
    const filename = record.s3.object.key
    await s3.deketObect({
      Bucket: BUCKET_NAME,
      Key: filename.replace('.', '-small.')
    })
  }
  return {
    message: 'File has been deleted.'
  }
};
