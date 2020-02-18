'use strict';

const AWS = require('aws-sdk')
const sharp = require('sharp')

const BUCKET_NAME = process.env.BUCKET_NAME
const s3 = new AWS.S3()

module.exports.handler = async ({ Records }) => {
  for (const record of Records) {
    const filename = record.s3.object.key
    const origin = await s3.getObject({
      Bucket: BUCKET_NAME,
      Key: filename
    }).promise()
    const originImage = new Buffer.from(origin.Body)
    const output = await sharp(originImage).resize(320).toBuffer()
    const newFilename = filename.replace('images/', 'thumbnails/')
    await s3.putObject({
      Bucket: BUCKET_NAME,
      Key: newFilename,
      Body: output
    }).promise()
  }
  return {
    message: 'File has been resized.'
  }
};
