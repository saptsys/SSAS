import { Button, Modal, Result } from 'antd';
import { exists } from 'original-fs';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { INVALID_REASONS } from '../../../Constants/SoftwareInvalidReasons';
import { errorDialog } from '../../helpers/dialogs';
import { FirmInfoActions } from '../../_redux/actionFiles/FirmInfoRedux';
import SupportFootLines from './SupportFootLines';


const SoftwareValidationsDialog = ({ match: { params: { type } } }) => {

  const dispatch = useDispatch()
  const firmState = useSelector(s => s.FirmInfo)

  const relaunch = () => promiseIpc.send('app/relaunch')
  const quit = () => promiseIpc.send('app/quit')
  const askForTrial = () => {
    dispatch(FirmInfoActions.askForTrial()).then(res => {
      Modal.success({
        title: res?.message ?? "Now try to relaunch.",
        okText: "Re-Launch",
        onOk: () => dispatch(FirmInfoActions.relauch()),
      })
    }).catch((err) => errorDialog(err?.message))
  }

  return (
    <div style={{ display: 'flex', height: '100vh', flexDirection: 'column' }}>
      <div style={{ flexGrow: 1 }}>
        {
          type === INVALID_REASONS.TRIAL_OVER
            ? (
              <Result
                status="warning"
                title="This software's trial period is over"
                subTitle={<>Please buy a license.<br /> You can call support person or If you have already bought it then try to relauch app.</>}
                extra={
                  <Button onClick={quit} type="default" style={{ width: '100px' }}>
                    Exit
                  </Button>
                }
              />
            )
            : type === INVALID_REASONS.SOFTWARE_EXPIRED
              ? (
                <Result
                  status="warning"
                  title="This software is expired."
                  subTitle={<>Please buy a license. or you can ask for trial</>}
                  extra={
                    <Button type="primary" onClick={askForTrial} loading={firmState.loading === "askForTrial"} >
                      Ask For Trial
                    </Button>
                  }
                />
              )
              : (
                <Result
                  status="error"
                  title={type}
                  subTitle="Please contact to support person."
                  extra={
                    <Button onClick={quit} type="default" style={{ width: '100px' }}>
                      Exit
                    </Button>
                  }
                />
              )
        }
      </div>
      <SupportFootLines />
    </div>
  )
};

export default SoftwareValidationsDialog;
