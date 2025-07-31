import Uppy from 'https://releases.transloadit.com/uppy/v4.13.0/uppy.min.mjs'
import AwsS3 from 'https://releases.transloadit.com/uppy/v4.13.0/aws-s3.min.mjs'
import Dashboard from 'https://releases.transloadit.com/uppy/v4.13.0/dashboard.min.mjs'

const uppy = new Uppy({
  debug: true,
  autoProceed: false,
  restrictions: {
    maxNumberOfFiles: 10,
    allowedFileTypes: ['image/*', 'video/*', 'application/pdf', 'audio/*'],
  }
})

uppy
  .use(Dashboard, {
    inline: true,
    target: '#uppy-dashboard',
    showProgressDetails: true,
    note: 'Accepted: images, video, audio, PDF',
  })
  .use(AwsS3, {
    getUploadParameters: (file) => {
      return fetch('https://0er6q5opk3.execute-api.us-west-2.amazonaws.com/UppyS3Presigner', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          filename: file.name,
          contentType: file.type,
        }),
      })
      .then((response) => response.json())
      .then((data) => ({
        method: 'POST',
        url: data.url,
        fields: data.fields,
      }))
    },
  })

uppy.on('complete', (result) => {
  console.log('✅ Successful uploads:', result.successful)
  console.warn('❌ Failed uploads:', result.failed)
})