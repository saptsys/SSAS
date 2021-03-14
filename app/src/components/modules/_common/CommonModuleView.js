import { Button, Col, Drawer, message, Modal, Row, Space, Spin, Tooltip } from 'antd';
import Text from 'antd/lib/typography/Text';
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import setupCommonToolBar from './CommonToolbar';
import './CommonModuleView.less'
import { ExclamationCircleOutlined } from '@ant-design/icons';
import confirm from 'antd/lib/modal/confirm';
import { useForm } from 'antd/lib/form/Form';
import { errorDialog } from "../../../helpers/dialogs";
import { LayoutActions } from '../../../_redux/actionFiles/LayoutRedux';
import { registerShortcuts, RegisterShortcutsWithComponent } from '../../../helpers/shortcutsRegister';
import AutoFocuser from '../../form/AutoFocuser';
import CommonEditForm, { COMMON_FORM_EVENTS } from './CommonEditForm';
import CommonEditDrawer from './CommonEditDrawer';

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
  drawerWidth = "500",
  editModeChanged,
  resetAfterSave = false
}) {
  const dispatch = useDispatch()
  const { currentState, title } = useSelector(state => ({
    currentState: state[reducerInfo.name],
    title: state.Layout.title
  }))
  const [filterText, setFilterText] = useState("")
  const [editMode, setEditMode] = useState({ mode: false, editId: null })
  const [tableData, setTableData] = useState([])

  const deleteBtnRef = useRef()
  const saveBtnRef = useRef()


  const editFormBtnHandler = (id) => {
    setEditMode({ mode: true, editId: id })
  }
  const cancelEditBtnHandler = () => {
    setEditMode({ mode: false, editId: null })
  }


  useEffect(() => {
    if (editModeChanged)
      editModeChanged(editMode)
  }, [editMode])


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
            resolve()
            setTableData(tableData.filter(x => x.id !== param))
            cancelEditBtnHandler()
            message.success("Record Deleted Successfuly", 4)
          }).catch(err => {
            reject()
            errorDialog(
              "Error while deleting record !",
              <span>{err.message}<br /><br />Please retry or close.</span>,
              () => Modal.destroyAll(),
              () => { }
            )
          })
        })
      },
    })
  }

  const onEditDrawerClosed = ({ event, param }) => {
    getTableData()
    if (event === COMMON_FORM_EVENTS.CREATED) {
    }
    if (event === COMMON_FORM_EVENTS.DELETED) {
      setTableData(tableData.filter(x => x.id !== param))
    }
    cancelEditBtnHandler()
  }

  const getTableData = () => dispatch(actions[methods.fetchTableData]())
    .then(setTableData)
    .catch(err => {
      errorDialog(
        "Error while getting data !",
        <span>{err.message}<br /><br />Please retry or close</span>,
        () => { },
        () => getTableData()
      )
    })

  useEffect(() => {
    setupCommonToolBar(dispatch, {
      createBtn: () => editFormBtnHandler(),
      searchBar: setFilterText
    })
    getTableData()
  }, [])

  useEffect(() => {
    dispatch(LayoutActions.setMessage(currentState.list.error ? <Text type="danger">Error: {currentState.list.error} <Button danger type="ghost" size="small" style={{ padding: "0 2px", backgroundColor: 'rgba(0,0,0,0)' }} onClick={getTableData}>Retry</Button></Text> : null))
  }, [currentState.list.error])

  return (
    <div style={{ position: 'relative' }}>
      {
        editMode.mode === true && (<RegisterShortcutsWithComponent name="edit mode" shortcuts={[
          ...[{
            key: "Escape",
            title: 'Esc to Cancel ',
            method: () => { cancelEditBtnHandler(); return true; }
          },
          ...(editMode.editId ? [
            {
              key: 'ctrl+d|Delete',
              title: "CTRL+D/Del to Delete",
              method: () => deleteBtnRef && deleteBtnRef.current && deleteBtnRef.current.click()
            }
          ] : []), {
            key: "ctrl+s",
            title: 'CTRL+S to Save ',
            method: () => { saveBtnRef && saveBtnRef.current && saveBtnRef.current.click() }
          }],
        ]} />)
      }
      {
        editMode.mode === false && (<RegisterShortcutsWithComponent name="table mode" shortcuts={[
          {
            key: "ctrl+a",
            title: 'CTRL+A to Add ',
            method: () => !editMode.mode && editFormBtnHandler(null)
          },
          {
            key: "ctrl+f",
            title: 'CTRL+F to Search ',
            method: () => {
              const el = document.getElementById("toolbar-search")
              if (el)
                el.focus()
            }
          },
          {
            key: "F5",
            title: 'F5 to Refresh ',
            method: () => {
              getTableData().then(() => message.info("Table Refreshed.", 1))
            }
          },
        ]} />)
      }
      <MainTable
        dataSource={tableData ?? []}
        loading={currentState.list.loading || currentState.action.loading === "delete"}
        filterText={filterText}
        editBtnHandler={editFormBtnHandler}
        deleteBtnHandler={deleteBtnHandler}
      />
      <CommonEditDrawer
        width={drawerWidth}
        onClose={() => cancelEditBtnHandler()}
        visible={editMode.mode}
      >
        <CommonEditForm
          EditForm={EditForm}
          actions={actions}
          closeDialog={onEditDrawerClosed}
          reducerInfo={reducerInfo}
          titleSufix={title}
          editId={editMode.editId}
          refs={{ deleteBtn: deleteBtnRef, saveBtn: saveBtnRef }}
          methods={methods}
          resetAfterSave={resetAfterSave}
        />
      </CommonEditDrawer>
    </div>
  )
}

export default CommonModuleView
