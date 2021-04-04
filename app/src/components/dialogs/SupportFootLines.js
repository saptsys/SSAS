import { Space } from 'antd';
import React from 'react';

const SupportFootLines = () => {
  return (
    <div style={{ backgroundColor: "aliceblue", textAlign: 'center' }} >
      <b>&copy; {new Date().getFullYear()} by <a href="saptsys.com">Saptsys.com</a></b>
      <br />
      <Space direction="horizontal" size={10}><b>Contact / Support:</b> <span>+917096823708</span>  <span>+919904021519</span>  <span>hello@saptsys.com</span></Space>
    </div>
  );
};

export default SupportFootLines;
