import React, { useEffect, useState } from 'react'
import { useDispatch } from "react-redux";
import { Form, Input, Button, message } from "antd";
import { ImportExternalActions } from "./../../../../_redux/actionFiles/ImportExternalRedux";
import { useForm } from 'antd/lib/form/Form';

function ImportExternalForm() {
  const dispatch = useDispatch();
  const [form] = useForm()

  const onGayatriFormFinish = (values) => {
    const payload = {
      path: values.databasePath,
      year: values.databaseYear
    }
    dispatch(ImportExternalActions.importFromGayatri(payload)).then((x) => {
      console.log(x)
      if (x) {
        message.success("Data Imported Successfuly", 4)
      }else{
        message.error("Something went wrong. make sure database path and year is corrent. and current database is empty", 4)
      }
    })
  };

  return (
    <Form
      name="gayatri"
      onFinish={onGayatriFormFinish}
      labelAlign="left"
      form={form}
    >
      <Button type="primary" onClick={() => {
        dispatch(ImportExternalActions.selectFolder()).then((x) => {
          if (!x.canceled) {
            form.setFieldsValue({ databasePath: x.filePaths[0] })
          }
        })
      }} >
        Select Database Path
      </Button>
      <Form.Item
        name="databasePath"
        label="database path"
        required
        rules={[{ required: true }]}
      >
        <Input disabled tabIndex="3" placeholder="select databae path" />
      </Form.Item>

      <Form.Item
        name="databaseYear"
        label="database year"
        required
        rules={[{ required: true }]}
      >
        <Input
          placeholder={"enter 1920 if database year is 2019-2020"}
          name="databaseYear"
        />
      </Form.Item>

      <Button type="primary" style={{ width: '100px' }} onClick={form.submit} >SUBMIT</Button>

    </Form>
  )
}

export default ImportExternalForm
