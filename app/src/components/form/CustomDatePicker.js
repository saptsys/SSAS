import { DatePicker } from 'antd';
import React, { useState } from 'react';
import { dateFormat } from "../../../Constants/Formats";

const CustomDatePicker = (props) => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <DatePicker
      onFocus={() => {
        !props.readOnly && setIsOpen(true);
        props.onBlur && props.onFocus(e);
      }}
      onBlur={(e) => {
        !props.readOnly && setIsOpen(false);
        props.onBlur && props.onBlur(e);
      }}
      format={props.format ?? dateFormat}
      open={isOpen}
      inputReadOnly={props.readOnly}
      allowClear={!!props.allowClear}
      {...props}
    />
  );
};

export default CustomDatePicker;
