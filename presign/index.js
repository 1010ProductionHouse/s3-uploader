import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'

// Your bucket and region
const REGION = 'us-west-2'
const BUCKET_NAME = 'edit-in-cloud-media-transfer'

const s3 = new S3Client({ region: REGION })

export async function handler(event) {
  try {
    const body = JSON.parse(event.body)
    const { filename, type, memberName } = body

    if (!filename || !type || !memberName) {
      return {
        statusCode: 400,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: 'Missing filename, type, or memberName' }),
      }
    }

    // Build S3 key: e.g. 1010productionhouse/sebastian/file.mp4
    const objectKey = `1010productionhouse/${memberName}/${filename}`

    const command = new PutObjectCommand({
      Bucket: BUCKET_NAME,
      Key: objectKey,
      ContentType: type,
    })

    const uploadURL = await getSignedUrl(s3, command, { expiresIn: 300 }) // 5 min

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ uploadURL }),
    }

  } catch (error) {
    console.error('❌ Presigner error:', error)
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Failed to generate upload URL' }),
    }
  }
}