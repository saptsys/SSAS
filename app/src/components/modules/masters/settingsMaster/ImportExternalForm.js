import React, { useEffect, useState } from 'react'
import { useDispatch } from "react-redux";
import { Form, Input, Button, message, Row, Col, Select, Modal } from "antd";
import { ImportExternalActions } from "./../../../../_redux/actionFiles/ImportExternalRedux";
import { useForm } from 'antd/lib/form/Form';
import Search from 'antd/lib/input/Search';
import { LayoutActions } from '../../../../_redux/actionFiles/LayoutRedux';
import Text from 'antd/lib/typography/Text';

function ImportExternalForm() {
  const dispatch = useDispatch();
  const [form] = useForm()

  useEffect(() => {
    dispatch(LayoutActions.setTitle("Database Migration from old software"))
    dispatch(LayoutActions.setToolbar(null))
  }, [])

  const onGayatriFormFinish = (values) => {
    const payload = {
      path: values.databasePath,
      year: values.databaseYear
    }
    Modal.confirm({
      title: "Are you sure ?", content: 'After clicking Yes then this action will not revert.', okText: "Yes", onOk: () => {
        return new Promise((resolve, reject) => {
          dispatch(ImportExternalActions.importFromGayatri(payload)).then((x) => {
            if (x) {
              message.success("Data Imported Successfuly", 4)
              resolve()
            } else {
              message.error("Something went wrong. make sure database path and year is corrent. and current database is empty", 4)
              reject()
            }
          }).catch(err => {
            message.error(err?.message ?? "Something went wrong. make sure database path and year is corrent. and current database is empty", 4)
            reject();
          })
        })
      }
    })

  };

  const layout = {
    labelCol: {
      span: 9,
    },
    wrapperCol: {
      span: 15
    }
  };

  return (
    <Row>
      <Col
        style={{ border: '1px solid #ddd', marginTop: '50px', padding: '30px 15px' }}
        xs={{ offset: 4, span: 16 }} md={{ offset: 7, span: 10 }} lg={{ offset: 7, span: 10 }}>
        <Form
          {...layout}
          name="gayatri"
          onFinish={onGayatriFormFinish}
          labelAlign="left"
          form={form}
        >
          <Text mark type="secondary"><b>Note: </b>This process import Parties & Items only from old software.</Text>
          <br /><br />
          <Form.Item
            name="softwareName"
            label="Old Software Name"
            required
            rules={[{ required: true, message: "Old Software Name Required" }]}
          >
            <Select
              optionLabelProp="label"
              options={[{ label: 'Gayatri Software', value: 0 }]} />
          </Form.Item>

          <Form.Item
            name="databasePath"
            label="Old Software Path"
            required
            rules={[{ required: true, message: "Please select old software path" }]}
          >
            {/* <Input disabled tabIndex="3" placeholder="select databae path" /> */}
            <Input readOnly placeholder="Click Here to Browse Path" onClick={() => {
              dispatch(ImportExternalActions.selectFolder()).then((x) => {
                if (!x.canceled) {
                  form.setFieldsValue({ databasePath: x.filePaths[0] })
                }
              })
            }} />
          </Form.Item>

          <Form.Item
            name="databaseYear"
            label="Old Database Year"
            required
            rules={[{ required: true, message: "Database year required" }]}
          >
            <Select
              placeholder="Old Software Database Year"
              optionLabelProp="label"
              options={
                function () {
                  const currentYear = new Date().getFullYear();
                  let opts = []
                  for (let i = currentYear; i >= (currentYear - 5); i--) {
                    opts.push({ label: i + "-" + ((i % 100) + 1), value: parseInt(i % 100) + '' + parseInt((i + 1) % 100) })
                  }
                  return opts;
                }()
              } />
          </Form.Item>

          <Row justify="center">
            <Col>
              <Button type="ghost" danger onClick={form.submit} >START MIGRATION</Button>
            </Col>
          </Row>

        </Form>


      </Col>
    </Row>
  )
}

export default ImportExternalForm
