import {IMAGE_UPLOAD_URL} from '../api/config';
import type { RcFile, UploadProps } from 'antd/es/upload';
import type { UploadFile } from 'antd/es/upload/interface';

interface FileType {
  type: string;
  uri: string | Blob;
  fileName: string;
  
}

export const uploadImage = async (data: FileType) => {


  
  const formData = new FormData();

  formData.append('file', data.uri, data.fileName);


  const response = await fetch(IMAGE_UPLOAD_URL, {
    method: 'POST',
    body: formData,
  });

  let responseData = await response.json();

  return {data: responseData, status: response.status};
};
