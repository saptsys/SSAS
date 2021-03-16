import Modal from 'antd/lib/modal/Modal';
import Title from 'antd/lib/typography/Title';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DeliveryChallanTable from './DeliveryChallanTable';
import { DeliveryChallanActions } from "../../../../_redux/actionFiles/DeliveryChallanRedux";
import { Button, Col, DatePicker, Row, Space } from 'antd';
import moment from 'moment';
import { dateFormat } from '../../../../../Constants/Formats';

const ImportChallansDialog = ({ isOpen, onImport, onCancel, parties, defaultFromDate = null, defaultToDate = null }) => {
  const dispatch = useDispatch()

  const deliveryChallanState = useSelector(s => s.DeliveryChallan)

  const [records, setRecords] = useState([])
  const [fromDate, setFromDate] = useState(defaultFromDate)
  const [toDate, setToDate] = useState(defaultToDate)
  const [selectedRows, setselectedRows] = useState([])

  useEffect(() => {
    let from = new Date()
    from.setDate(1)
    let to = new Date()
    if (toDate && fromDate) {
      from = fromDate
      to = toDate
    }
    setFromDate(from)
    setToDate(to)
  }, [])

  const loadData = () => {
    if (isOpen && parties.length && fromDate && toDate) {
      dispatch(DeliveryChallanActions.getByPartyAndDates(parties, fromDate, toDate)).then(setRecords)
    }
  }

  useEffect(() => {
    loadData()
  }, [parties.length, toDate, fromDate, isOpen])

  useEffect(() => {
    if (isOpen === false)
      setselectedRows([])
  }, [isOpen])

  return (
    <Modal
      visible={isOpen}
      title={null}
      onCancel={onCancel}
      onOk={onImport}
      footer={[
        <Row>
          <Col flex="none">
            <Space align="center">
              <label>From</label>
              <DatePicker size="small" format={dateFormat} value={moment(fromDate)} onChange={d => setFromDate(d.toDate())} />
              <label>To</label>
              <DatePicker size="small" format={dateFormat} value={moment(toDate)} onChange={d => setToDate(d.toDate())} />
              {/* <Button type="primary" ghost loading={!!deliveryChallanState.list.loading} onClick={() => loadData()}>GET</Button> */}
            </Space>
          </Col>
          <Col flex="auto">
            <Button type="primary" onClick={() => onImport(records.filter(x => selectedRows.includes(x.id)))}>Import</Button>
          </Col>
        </Row>
      ]}
      width={900}

    >
      <Title level={4}>Import Delivery Challans</Title>
      <br />
      <DeliveryChallanTable
        dataSource={records ?? []}
        loading={deliveryChallanState.list.loading}
        pagination={false}
        rowSelection={{
          selectedRows,
          onChange: setselectedRows,
          columnWidth: "30px"
        }}
        scroll={{ y: 300 }}
      // onRow={(record, rowIndex) => ({
      //   onClick: () => {
      //     debugger;
      //     if (selectedRows.includes(record.id)) {
      //       setselectedRows(selectedRows.filter(x => x !== record.id))
      //     } else {
      //       setselectedRows([...selectedRows, record.id])
      //     }
      //   }
      // })}
      />
    </Modal>
  );
};

export default ImportChallansDialog;
