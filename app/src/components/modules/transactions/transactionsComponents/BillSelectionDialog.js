import Modal from 'antd/lib/modal/Modal';
import Title from 'antd/lib/typography/Title';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DeliveryChallanActions } from "../../../../_redux/actionFiles/DeliveryChallanRedux";
import { Button, Col, DatePicker, Row, Space } from 'antd';
import moment from 'moment';
import { dateFormat } from '../../../../../Constants/Formats';
import _BillTransactionActionsBase from '../../../../_redux/actionFiles/_BillTransactionsBase';
import CommonTable from '../../_common/CommonTable';

/**
 *
 * @param {{ReduxObj:{actions:_BillTransactionActionsBase}}} param0
 * @returns
 */
const BillSelectionDialog = ({ title = "Select Bill(s)", isOpen, onSelectDone, onCancel, parties, defaultFromDate = null, defaultToDate = null, ReduxObj, columns }) => {
  const dispatch = useDispatch()

  const billState = useSelector(s => s[ReduxObj.name])

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
    if (isOpen && fromDate && toDate) {
      dispatch(ReduxObj.actions.getByPartyListAndDateInterval(parties, fromDate, toDate)).then(setRecords)
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
              {/* <Button type="primary" ghost loading={!!billState.list.loading} onClick={() => loadData()}>GET</Button> */}
            </Space>
          </Col>
          <Col flex="auto">
            <Button type="primary" onClick={() => onImport(records.filter(x => selectedRows.includes(x.id)))}>Import</Button>
          </Col>
        </Row>
      ]}
      width={900}

    >
      <Title level={4}>{title}</Title>
      <br />
      <CommonTable
        columns={columns ?? [
          {
            title: "Bill No",
            dataIndex: "billNumber",
            align: 'center',
            width: '15%',
            render: (cell, row) => row.billing + ' / ' + cell
          },
          {
            title: "Date",
            dataIndex: "billDate",
            width: '15%',
            render: cell => moment(cell).format(dateFormat)
          },
          {
            title: "Party",
            dataIndex: "partyName",
            width: '25%',
          },
          {
            title: 'Net Amount',
            dataIndex: 'netAmount',
            align: 'right',
            width: '15%'
          },
          {
            title: "Remarks",
            dataIndex: "remarks",
            width: '30%'
          },
        ]}
        dataSource={records ?? []}
        loading={billState.list.loading}
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

export default BillSelectionDialog;
