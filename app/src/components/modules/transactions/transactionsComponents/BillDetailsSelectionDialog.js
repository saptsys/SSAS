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
import Text from 'antd/lib/typography/Text';

const BillDetailsSelectionDialog = ({ title = "Select Bill's Item", isOpen, onSelectDone, onCancel, trxId, ReduxObj, columns, type = "check" }) => {
  const dispatch = useDispatch()

  const billState = useSelector(s => s[ReduxObj.name])

  const [data, setData] = useState(null)
  const [selectedRows, setselectedRows] = useState([])

  const loadData = () => {
    if (trxId && isOpen) {
      dispatch(ReduxObj.actions.getByIdWithDetails(trxId)).then(setData)
    }
  }

  useEffect(() => {
    loadData()
  }, [trxId, isOpen])

  useEffect(() => {
    if (isOpen === false)
      setselectedRows([])
  }, [isOpen])

  const onOk = () => {
    onSelectDone(data?.billsDetail?.filter(x => selectedRows.includes(x.id)) ?? [])
  }

  return (
    <Modal
      visible={isOpen}
      title={null}
      onCancel={onCancel}
      onOk={() => onOk()}
      okText="Done"
      width={900}
      destroyOnClose
    >
      <Title level={4}>{title}</Title>
      <br />
      {!!billState.action.error && !billState.action.loading && (<Text type="danger" >Error : {billState.action.error}  <Button style={{ padding: "0 5px" }} danger onClick={loadData} type="text">Retry</Button></Text>)}
      <CommonTable
        title={() => data ? (
          <Space direction="horizontal" size={12}>
            <Text >Bill Number: {data?.billNumber}</Text>
            <Text >Bill Date: {moment(data?.billDate).format(dateFormat)}</Text>
            <Text >Party: {data?.partyName}</Text>
          </Space>
        ) : undefined}
        columns={columns ?? [
          {
            title: "Item",
            dataIndex: "itemName",
            width: '25%'
          },
          {
            title: "Description",
            dataIndex: "description",
            width: '20%'
          }, {
            title: "Unit",
            dataIndex: "itemUnitName",
            width: '12%',
          }, {
            title: "Qty",
            dataIndex: "quantity",
            width: '10%',
            align: 'right'
          }, {
            title: "Rate",
            dataIndex: "rate",
            width: '10%',
            align: 'right'
          }, {
            title: "Amount",
            dataIndex: "amount",
            width: '10%',
            align: 'right'
          }
        ]}
        dataSource={data?.billsDetail ?? []}
        loading={billState.action.loading}
        pagination={false}
        rowSelection={{
          type: type,
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

export default BillDetailsSelectionDialog;
