import {IMAGE_UPLOAD_URL} from '../api/config';
import type { RcFile, UploadProps } from 'antd/es/upload';
import type { UploadFile } from 'antd/es/upload/interface';

interface FileType {
  type: string;
  uri: string;
  fileName: string;
  
}

export const uploadImage = async (data: FileType) => {

  
  console.log('uploadImage')
  console.log(data)
  
  const formData = new FormData();

  formData.append('file', {
    type: "image/png",
    uri: data.uri,
    name: data.fileName,
  });

  const response = await fetch(IMAGE_UPLOAD_URL, {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'Content-Type': 'multipart/form-data',
    },
    body: formData,
  });

  let responseData = await response.json();

  return {data: responseData, status: response.status};
};
