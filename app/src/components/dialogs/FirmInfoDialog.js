import React, { useEffect, useState } from 'react';
import { Col, Input, Row, Form, Space, Button, Modal } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import TextArea from 'antd/lib/input/TextArea';
import Regex from '../../../Constants/Regex';
import BorderedSwitch from '../form/BorderedSwitch';
import { AccountTypesDropdown, StatesDropdown } from '../modules/_common/CommonDropdowns';
import Title from 'antd/lib/typography/Title';
import Text from 'antd/lib/typography/Text';
import { useDispatch, useSelector } from 'react-redux';
import { FirmInfoActions } from '../../_redux/actionFiles/FirmInfoRedux';
import { errorDialog, successDialog } from '../../helpers/dialogs';
import {
  app,
} from 'electron';
import FirmInfoForm from '../modules/utility/firmInfo/FirmInfoForm';
import SupportFootLines from './SupportFootLines';


const FirmInfoDialog = ({ intialData }) => {
  const [form] = useForm()

  const dispatch = useDispatch()


  const [isOnline, setIsOnline] = useState(window.navigator.onLine)
  useEffect(() => {
    const offline = () => setIsOnline(false)
    const online = () => setIsOnline(true)
    window.addEventListener('online', online);
    window.addEventListener('offline', offline);
    return () => {
      window.removeEventListener('online', online)
      window.removeEventListener('offline', offline)
    }
  }, [window.navigator.onLine])

  const saveBtnHandler = (values) => {
    dispatch(FirmInfoActions.save(values)).then(({ data }) => {
      if (data) {
        if (data.expired) {
          errorDialog("Your software is expired. please contact to support person.")
        } else {
          Modal.success({
            title: data.existing ? " 🎉 Your firm is registered successfully. 🍻" : "Welcome back. Good to see you. 🧡",
            content: (data.licence_type === "TRIAL" ? "Currently running in trial mode ⏳" : "Press button to relaunch."),
            okText: "Re-Launch",
            onOk: () => dispatch(FirmInfoActions.relauch()),
          })
        }
      }
    }).catch(err => {
      errorDialog(err?.message)
    })
  }

  return (
    <div style={{ height: "100vh", display: 'flex', flexDirection: 'column' }}>
      <Title level={4} type="primary" style={{ backgroundColor: "#eee" }} >Enter Your Firm Information</Title>

      <div style={{ padding: '10px 20px', flexGrow: '1' }}>
        {!isOnline && (
          <>
            <Text mark style={{ width: '100%' }}><b>Warning: </b>Internet is not connected to your system, please connect it first.</Text>
            <br />
          </>
        )}
        <br />
        <FirmInfoForm form={form} saveBtnHandler={saveBtnHandler} />
      </div>
      <SupportFootLines />
    </div>
  );
};

export default FirmInfoDialog;
