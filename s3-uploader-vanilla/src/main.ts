import Uppy from '@uppy/core';
import Dashboard from '@uppy/dashboard';
import AwsS3 from '@uppy/aws-s3';

import '@uppy/core/dist/style.css';
import '@uppy/dashboard/dist/style.css';

const uppy = new Uppy({ debug: true, autoProceed: false });

uppy.use(Dashboard, {
  inline: true,
  target: '#drag-drop-area',
  showProgressDetails: true,
});

uppy.use(AwsS3, {
  async getUploadParameters(file: import('@uppy/core').UppyFile<{}, {}>) {
    const response = await fetch('https://qfiknfbru7xmrtczcqy2767hju0innfi.lambda-url.us-west-2.on.aws/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: 'sebastian',
        filename: file.name
      })
    });

    const data = await response.json();

    return {
      method: 'PUT',
      url: data.presignedUrl,
      fields: {},
      headers: {
        'Content-Type': file.type
      }
    };
  }
} as unknown as import('@uppy/aws-s3').AwsS3Options<{}, {}>);

uppy.on('complete', (result) => {
  console.log('Upload complete! Files:', result.successful);
});