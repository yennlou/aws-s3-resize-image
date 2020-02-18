'use strict';

const AWS = require('aws-sdk')
const sharp = require('sharp')

const BUCKET_NAME = process.env.BUCKET_NAME
const s3 = new AWS.S3()

module.exports.handler = async event => {
  for (const record of event) {
    const filename = record.s3.object.key
    const origin = await s3.getObject({
      Bucket: BUCKET_NAME,
      Key: filename
    }).promise() 
    const output = sharp(origin.Body).resize(200).toBuffer()
    const newFilename = filename.replace('.', '-small.')
    return await s3.putObject({
      Bucket: BUCKET_NAME,
      Body: output,
      Key: newFilename
    })
  }
};
