
import React from 'react';
import { UploadOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import { Button, message, Upload } from 'antd';

const props: UploadProps = {
  beforeUpload: (file) => {
    const isPNG = file.type === 'image/png' || file.type === 'image/jpeg';;
    if (!isPNG) {
      message.error(`${file.name} is not a png file`);
    }
    return isPNG || Upload.LIST_IGNORE;
  },
  onChange: (info) => {
    console.log(info.fileList);
  },
};

const UploadImg = ({ children, onChange }) => (
  <Upload showUploadList={false}
    customRequest={({ }) =>
      console.log("ok")
    } {...props} onChange={(e) => onChange(e.file)} onDownload={() => { }}>
    {children}
  </Upload>
);

export default UploadImg;