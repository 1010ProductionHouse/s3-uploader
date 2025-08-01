import Uppy from '@uppy/core'
import Dashboard from '@uppy/dashboard'
import AwsS3 from '@uppy/aws-s3'

import '@uppy/core/dist/style.css'
import '@uppy/dashboard/dist/style.css'

// ✅ Your real API Gateway endpoint
const API_GATEWAY_URL = 'https://0er6q5opk3.execute-api.us-west-2.amazonaws.com/'

const uppy = new Uppy({
  autoProceed: false,
  restrictions: {
    maxNumberOfFiles: 5,
    allowedFileTypes: ['image/*', 'application/pdf']
  }
})

uppy
  .use(Dashboard, {
    inline: true,
    target: 'body',
    note: 'Only images and PDFs allowed',
    showProgressDetails: true
  })
  .use(AwsS3, {
    companionUrl: API_GATEWAY_URL
  })

uppy.on('complete', (result) => {
  console.log('✅ Upload complete! Files:', result.successful)
})