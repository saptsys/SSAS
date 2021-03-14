import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Button, Col, message, Row, Space, Spin, Tooltip } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import { Header } from 'antd/lib/layout/layout';
import confirm from 'antd/lib/modal/confirm';
import Text from 'antd/lib/typography/Text';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { errorDialog } from '../../../helpers/dialogs';
import AutoFocuser from '../../form/AutoFocuser';
import './commonEditForm.less'

export const COMMON_FORM_EVENTS = {
  CANCELLED: 'calncelled',
  CREATED: "created",
  DELETED: "deleted"
}

const CommonEditForm = ({
  reducerInfo,
  EditForm,
  methods = {
    fetchEditData: "getById",
    saveForm: "save",
    deleteRecord: "delete"
  },
  actions,
  editId = null,
  titleSufix,
  closeDialog,
  refs = { cancelBtn: undefined, deleteBtn: undefined, saveBtn: undefined },
  resetAfterSave = false
}) => {
  const [entityForEdit, setEntityForEdit] = useState(new reducerInfo.model())
  const currentState = useSelector(state => state[reducerInfo.name])
  const [formRef] = useForm()

  const dispatch = useDispatch()

  const resetAndCloseDialog = (event = COMMON_FORM_EVENTS.CANCELLED, param = null) => {
    closeDialog({ event, param })
  }

  useEffect(() => {
    if (editId)
      dispatch(actions[methods.fetchEditData](editId)).then((res) => {
        setEntityForEdit(res)
      }).catch(err => errorDialog(
        `Error while getting ${titleSufix} for edit!!`,
        <span>{err.message}</span>,
        resetAndCloseDialog,
        undefined
      ))
    else
      setEntityForEdit(new reducerInfo.model())
  }, [editId])


  const saveBtnHandler = (values) => {
    dispatch(actions[methods.saveForm](values)).then((res) => {
      message.success(titleSufix + " Saved Successfuly", 4)
      if (resetAfterSave)
        setEntityForEdit(new reducerInfo.model())
      else
        resetAndCloseDialog(COMMON_FORM_EVENTS.CREATED, res)
    }).catch(err => {
      errorDialog(
        "Error while saving data !",
        <span>{err.message}<br /><br />Please retry or close</span>,
        () => { },
        () => saveBtnHandler(values)
      )
    })
  }

  const deleteBtnHandler = (param) => {
    confirm({
      title: 'Do you want to delete ' + titleSufix + "?",
      icon: <ExclamationCircleOutlined style={{ color: 'orange' }} />,
      content: `When clicked the OK button, the ${titleSufix} will be deleted`,
      okType: 'danger',
      okButtonProps: { style: { width: '75px' } },
      cancelButtonProps: { style: { width: '75px' } },
      onOk() {
        return new Promise((resolve, reject) => {
          return dispatch(actions[methods.deleteRecord](param)).then(res => {
            resolve()
            message.success(titleSufix + " Deleted Successfuly", 4)
            resetAndCloseDialog(COMMON_FORM_EVENTS.DELETED, res)
          }).catch(err => {
            reject()
            errorDialog(
              `Error while deleting ${titleSufix} !`,
              <span>{err.message}<br /><br />Please retry or close.</span>,
              () => Modal.destroyAll(),
              () => { }
            )
          })
        })
      },
    })
  }

  useEffect(() => formRef.resetFields(), [entityForEdit])

  return (
    <Spin spinning={currentState.action.loading === methods.fetchEditData} wrapperClassName="form-spinner">
      <AutoFocuser lastElement="#save">
        <div className="form-header">
          <Row justify="space-around" align="middle">
            <Col flex="auto">
              <Text className="header-title">{(editId ? 'Edit ' : 'Create ') + titleSufix}</Text>
            </Col>
            <Col flex="none">
              <Space>
                <Button
                  ref={refs.cancelBtn}
                  type="ghost"
                  onClick={() => resetAndCloseDialog()}>
                  Cancel
                            </Button>
                <Button
                  ref={refs.deleteBtn}
                  hidden={!editId}
                  type="ghost" danger
                  onClick={() => deleteBtnHandler(editId)}>
                  Delete
                            </Button>
                <Tooltip title="Press enter to save" placement="bottomLeft" trigger="focus">
                  <Button
                    ref={refs.saveBtn}
                    id="save"
                    type="primary"
                    loading={currentState.action.loading === methods.saveForm}
                    onClick={() => formRef && formRef.submit()}>
                    Save
                                </Button>
                </Tooltip>
              </Space>
            </Col>
          </Row>
        </div>
        <div className="form-body">
          <EditForm
            entityForEdit={entityForEdit}
            saveBtnHandler={saveBtnHandler}
            form={formRef}
          />
        </div>
      </AutoFocuser>
    </Spin>
  );
};

export default CommonEditForm;
