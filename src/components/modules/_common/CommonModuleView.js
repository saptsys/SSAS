import { Button, Col, Drawer, message, Row, Space, Spin } from 'antd';
import Text from 'antd/lib/typography/Text';
import Title from 'antd/lib/typography/Title';
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import setupCommonToolBar from './CommonToolbar';
import './CommonModuleView.less'

function CommonModuleView({
  reducerInfo,
  MainTable,
  EditForm,
  methods = { fetchTableData: "getAll", fetchEditData: "getById", saveForm: "save" },
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

  const editFormBtnHandler = (params) => {
    if (params) {
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
  const getTableData = () => dispatch(actions[methods.fetchTableData]()).then(setTableData)

  useEffect(() => {
    setupCommonToolBar(dispatch, {
      createBtn: editFormBtnHandler,
      searchBar: setFilterText
    })
    getTableData()
  }, [])
  return (
    <div style={{ position: 'relative' }}>
      <MainTable
        dataSource={tableData ?? []}
        loading={currentState.list.loading}
        filterText={filterText}
        editBtnHandler={editFormBtnHandler}
        deleteBtnHandler={undefined}
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
                <Button hidden={!editMode.entityForEdit?.id} type="ghost" danger onClick={() => cancelEditBtnHandler()}>Delete</Button>
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
          />
        </Spin>
        {/* <EditForm /> */}
      </Drawer>
    </div>
  )
}

export default CommonModuleView
