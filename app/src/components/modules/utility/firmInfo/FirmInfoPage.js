import { Alert, Button, Col, Row, Space } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { errorDialog, successDialog } from '../../../../helpers/dialogs';
import { FirmInfoActions } from '../../../../_redux/actionFiles/FirmInfoRedux';
import { LayoutActions } from '../../../../_redux/actionFiles/LayoutRedux';
import FirmInfoForm from './FirmInfoForm';

const FirmInfoPage = () => {
  const dispatch = useDispatch()

  const [form] = useForm()
  const { data, loading, error } = useSelector(s => s.FirmInfo)

  const saveBtnHandler = (values) => {
    dispatch(FirmInfoActions.updateFirm({ ...data.defaultFirm, ...values }))
      .then(() => {
        successDialog("Updated Successfully", "Press ok to reload window.", "OK", () => window.location.reload())
      }).catch(err => errorDialog(err?.message))
  }

  useEffect(() => {
    dispatch(LayoutActions.setTitle("Edit Firm Information"))
    dispatch(LayoutActions.setToolbar(
      <Space>
        <Button loading={loading === "updateFirm"} style={{ width: '100px' }} type="primary" onClick={() => form.submit()} id="toolbar-create">Save</Button>
      </Space>
    ))
  }, [])

  useEffect(() => {
    form.resetFields()
  }, [data])

  return (
    <Row>
      <Col xs={{ offset: 1, span: 22 }} lg={{ offset: 4, span: 16 }} >
        <br /><br />
        {!loading && error && <Alert type="error" banner message={error?.message} closable />}
        <FirmInfoForm form={form} saveBtnHandler={saveBtnHandler} editMode={true} entityForEdit={data} />
      </Col>
    </Row>
  );
};

export default FirmInfoPage;
