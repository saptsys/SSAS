import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from "react-router-dom";

import { DeliveryChallanActions } from '../../../_redux/actionFiles/DeliveryChallanRedux';
import { Col, Divider, Row, Table } from "antd";
import moment from "moment"
import { dateFormat } from "../../../../Constants/Formats";
import geoStates from "../../../../Constants/States";

const ChalanPrintTemplate = () => {
  const dispatch = useDispatch()
  const [billData, setBillData] = useState(null)
  let { id } = useParams();
  const { FirmInfoState , SettingsMasterState } = useSelector(state => ({
    FirmInfoState: {
      firmName: state.FirmInfo.data?.firms?.find(x => x.id && x.default)?.name,
      gstin: state.FirmInfo.data?.firms?.find(x => x.id && x.default)?.gstin,
      address: state.FirmInfo.data?.firms?.find(x => x.id && x.default)?.address,
      firmState : state.FirmInfo.data?.firms?.find(x => x.id && x.default)?.state,
    },
    SettingsMasterState: {
      list: state.SettingsMaster.list
    }
  }))
  useEffect(() => {
    dispatch(DeliveryChallanActions.getByIdWithDetails(id)).then(setBillData)
  }, [])
  let padding = 20;

  let columns = [
    {
      title: "#",
      dataIndex: "id",
      render: (text, row, index) => billData.deliveryDetails.indexOf(row) + 1,
      width: "10px",
      footer: () => {
        return <div>Total</div>;
      }
    },
    {
      title: "Name",
      dataIndex: "itemMaster",
      width: "25%",
      render: (x , row) => x.name + (row.description ? ` (${row.description})` : "")
    },
    {
      title: "HSN",
      dataIndex: "itemMaster",
      render: (x) => x.HSNCode
    },
    {
      title: "Quantity",
      align: 'right',
      dataIndex: "quantity",
    },
    {
      title: "Unit",
      dataIndex: "itemUnitMaster",
      render: (x) => x.code

    },
    {
      title: "Price/Unit",
      dataIndex: "rate",
      align: 'right',
      render: (x) => "₹ " + x
    },
    {
      title: "Amount",
      dataIndex: "amount",
      align: 'right',
      render: (x) => "₹ " + x
    }
  ];

  return (
    billData ?
    <div style={{ padding: padding }}>

      <Row gutter={24} style={{ marginTop: 32 }}>
        <Col span={8}>
          <h3 style={{ color: "#1890ff" }}>{FirmInfoState.firmName}</h3>

          <div>{FirmInfoState.address}</div>
          {/* {FirmInfoState.phone ? <div>Phone no: {FirmInfoState.phone}</div> : ""} */}
          {
            FirmInfoState.gstin ?
            <div>GSTIN: {FirmInfoState.gstin}</div>
            : ""
          }
          <div>State: {FirmInfoState.firmState}</div>
        </Col>
      </Row>

      <Divider align="center" style={{ color: "#1890ff" }}>
        Chalan
      </Divider>

      <Row justify="space-between" style={{ marginTop: 32 }}>
        <Col>
          <div>Bill To:</div>
          <strong>{billData.partyMaster.name}</strong>
          <div>{billData.partyMaster.address}</div>
          <div>GSTIN: {billData.partyMaster.gstin}</div>
          <div>State: {geoStates.find(x => x.tin == billData.partyMaster.stateCode)?.stateName}</div>
        </Col>
        <Col>
          <table>
            <tr>
              <th>Chalan # :</th>
              <td>{billData.challanNumber}</td>
            </tr>
            <tr>
              <th>Chalan Date :</th>
              <td>{moment(billData.challanDate).format(dateFormat)}</td>
            </tr>
          </table>
        </Col>
      </Row>

      <Row gutter={24} style={{ marginTop: 10 }}>
        <Table
          size="small"
          className="invoiceTable"
          style={{ width: "100%" }}
          dataSource={billData.deliveryDetails ?? []}
          columns={columns}
          pagination={false}
          summary={(pageData) => {
            let totalQuantity = 0;
            let totalAmount = 0;

            pageData.forEach(({ quantity, amount }) => {
              console.log(quantity, amount);
              totalQuantity += quantity;
              totalAmount += amount;
            });

            return (
              <Table.Summary.Row>
                <Table.Summary.Cell>
                  <strong>Total</strong>
                </Table.Summary.Cell>
                <Table.Summary.Cell></Table.Summary.Cell>
                <Table.Summary.Cell></Table.Summary.Cell>
                <Table.Summary.Cell>
                  <strong>{totalQuantity}</strong>
                </Table.Summary.Cell>
                <Table.Summary.Cell></Table.Summary.Cell>
                <Table.Summary.Cell></Table.Summary.Cell>
                <Table.Summary.Cell>
                  <strong>₹ {totalAmount}</strong>
                </Table.Summary.Cell>
              </Table.Summary.Row>
            );
          }}
        ></Table>
      </Row>
      <Row justify="space-between" style={{ marginTop: 10 }}>
        <Col>
          <strong>INVOICE AMOUNT IN WORDS</strong>
          <div>Twenty Thousand One Hundred Rupees only</div>
          <br />
          <strong>TERMS AND CONDITIONS</strong>
          <div>non returnable</div>
        </Col>
        <Col>
          <table>
            <tr>
              <th>IGST @6% :</th>
              <td>₹. </td>
            </tr>
            <tr>
              <th>CGST @6% :</th>
              <td>₹. 95.94</td>
            </tr>
            <tr>
              <th>SGST @6% :</th>
              <td>₹. 95.94</td>
            </tr>
            <tr style={{ backgroundColor: "#1890ff" }}>
              <th>Net Amount :</th>
              <td>₹. {billData.netAmount}</td>
            </tr>
          </table>
          <Divider align="center" style={{ color: "#1890ff" }}></Divider>
        </Col>
      </Row>
      <Row justify="space-between">
        <Col>bank details or qr code</Col>
        <Col>
          <div>{FirmInfoState.firmName}</div>
          <div>
            <br />
            <br />
          </div>
          <strong>Authorized Signatory</strong>
        </Col>
      </Row>
    </div>
    : <></>
  );
};

export default ChalanPrintTemplate;
