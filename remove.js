'use strict';

const AWS = require('aws-sdk')

const BUCKET_NAME = process.env.BUCKET_NAME
const s3 = new AWS.S3()

module.exports.handler = async event => {
  for (const record of event) {
    const filename = record.s3.object.key
    return await s3.deketObect({
      Bucket: BUCKET_NAME,
      Key: filename.replace('.', '-small.')
    })
  }
};
