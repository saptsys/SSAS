import { Button, Col, Drawer, message, Row, Space, Spin } from 'antd';
import Text from 'antd/lib/typography/Text';
import Title from 'antd/lib/typography/Title';
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import setupCommonToolBar from './CommonToolbar';
import './CommonModuleView.less'
import { ExclamationCircleOutlined } from '@ant-design/icons';
import confirm from 'antd/lib/modal/confirm';
import { useForm } from 'antd/lib/form/Form';

function CommonModuleView({
  reducerInfo,
  MainTable,
  EditForm,
  methods = {
    fetchTableData: "getAll",
    fetchEditData: "getById",
    saveForm: "save",
    deleteRecord: "delete"
  },
  actions,
  drawerWidth = "500"
}) {
  const dispatch = useDispatch()
  const { currentState, title } = useSelector(state => ({
    currentState: state[reducerInfo.name],
    title: state.Layout.title
  }))
  const [filterText, setFilterText] = useState("")
  const [editMode, setEditMode] = useState({ mode: false, entityForEdit: null })
  const [tableData, setTableData] = useState([])
  const saveBtnRef = useRef()
  const [editUseForm] = useForm()

  const editFormBtnHandler = (params) => {
    if (params) {
      setEditMode({ mode: true, entityForEdit: null })
      dispatch(actions[methods.fetchEditData](params)).then((res) => {
        setEditMode({ mode: true, entityForEdit: res })
      })
    } else {
      setEditMode({ mode: true, entityForEdit: reducerInfo.model })
    }
  }
  const saveBtnHandler = (values) => {
    dispatch(actions[methods.saveForm](values)).then((res) => {
      getTableData()
      message.success("Record Saved Successfuly", 4)
      cancelEditBtnHandler()
    })
  }
  const cancelEditBtnHandler = () => {
    setEditMode({ mode: false, entityForEdit: null })
  }
  const deleteBtnHandler = (param) => {
    confirm({
      title: 'Do you want to delete this record?',
      icon: <ExclamationCircleOutlined style={{ color: 'orange' }} />,
      content: 'When clicked the OK button, the record will be deleted',
      okType: 'danger',
      okButtonProps: { style: { width: '75px' } },
      cancelButtonProps: { style: { width: '75px' } },
      onOk() {
        return new Promise((resolve, reject) => {
          return dispatch(actions[methods.deleteRecord](param)).then(res => {
            message.success("Record Deleted Successfuly", 4)
            resolve()
            setTableData(tableData.filter(x => x.id !== param))
            cancelEditBtnHandler()
          })
        })
      },
    })
  }

  const getTableData = () => dispatch(actions[methods.fetchTableData]()).then(setTableData)

  useEffect(() => {
    setupCommonToolBar(dispatch, {
      createBtn: editFormBtnHandler,
      searchBar: setFilterText
    })
    getTableData()
  }, [])

  useEffect(() => {
    if (editUseForm) {
      editUseForm.resetFields()
    }
  }, [editMode.entityForEdit])


  return (
    <div style={{ position: 'relative' }}>
      <MainTable
        dataSource={tableData ?? []}
        loading={currentState.list.loading || currentState.action.loading === "delete"}
        filterText={filterText}
        editBtnHandler={editFormBtnHandler}
        deleteBtnHandler={deleteBtnHandler}
      />
      <Drawer
        id="edit-drawer"
        width={drawerWidth}
        onClose={() => cancelEditBtnHandler()}
        visible={editMode.mode}
        destroyOnClose={true}
        title={(
          <Row justify="space-around" align="middle">
            <Col flex="auto">
              <Text className="header-title">{(editMode.entityForEdit?.id ? 'Edit ' : 'Create ') + title}</Text>
            </Col>
            <Col flex="none">
              <Space>
                <Button type="ghost" onClick={() => cancelEditBtnHandler()}>Cancel</Button>
                <Button hidden={!editMode.entityForEdit?.id} type="ghost" danger onClick={() => deleteBtnHandler(editMode.entityForEdit.id)}>Delete</Button>
                <Button type="primary" loading={currentState.action.loading === methods.saveForm} onClick={() => saveBtnRef && saveBtnRef.current && saveBtnRef.current.click()}>Save</Button>
              </Space>
            </Col>
          </Row>
        )}
        closable={false}
      >
        <Spin spinning={currentState.action.loading === methods.fetchEditData}>
          <EditForm
            entityForEdit={editMode.entityForEdit}
            saveBtnHandler={saveBtnHandler}
            saveBtnRef={saveBtnRef}
            form={editUseForm}
          />
        </Spin>
        {/* <EditForm /> */}
      </Drawer>
    </div>
  )
}

export default CommonModuleView
