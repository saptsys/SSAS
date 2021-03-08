import { DatePicker } from 'antd';
import React, { useState } from 'react';

const CustomDatePicker = (props) => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <DatePicker
      onFocus={() => setIsOpen(true)}
      onBlur={() => setIsOpen(false)}
      open={isOpen}  {...props}
    />
  );
};

export default CustomDatePicker;