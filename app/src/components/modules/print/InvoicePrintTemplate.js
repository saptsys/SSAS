import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from "react-router-dom";

import { SalesInvoiceActions } from '../../../_redux/actionFiles/SalesInvoiceRedux';
import moment from "moment"
import { dateFormat } from "../../../../Constants/Formats";
import geoStates from "../../../../Constants/States";
import './printStyle.less';


const InvoicePrintTemplate = () => {
  const dispatch = useDispatch()
  const [billData, setBillData] = useState(null)
  let { id } = useParams();
  const { FirmInfoState, SettingsMasterState } = useSelector(state => ({
    FirmInfoState: {
      firmName: state.FirmInfo.data?.firms?.find(x => x.id && x.default)?.name,
      gstin: state.FirmInfo.data?.firms?.find(x => x.id && x.default)?.gstin,
      address: state.FirmInfo.data?.firms?.find(x => x.id && x.default)?.address,
      firmState: state.FirmInfo.data?.firms?.find(x => x.id && x.default)?.state,
    },
    SettingsMasterState: {
      list: state.SettingsMaster.list
    }
  }))
  useEffect(() => {
    dispatch(SalesInvoiceActions.getByIdWithDetails(id)).then(setBillData)
  }, [])
  let padding = 20;

  return (
    billData ?
      <div class="a4">
        <table style={{ width: "100%" }} border="1" cellSpacing="0">
          <thead style={{ width: "100%" }}>
            <tr>
              <th colSpan="4" style={{textAlign:"center",verticalAlign:"center"}}>
                <h2>{FirmInfoState.firmName}</h2>
                <p>{FirmInfoState.address}</p>
              </th>
            </tr>
            <tr>
              <th colSpan="4">
                <div style={{ display: "flex" }}>
                  <div style={{ flexGrow: 1, textAlign: "left" }}>
                    GSTIN: {FirmInfoState.gstin}
                    <br /> PAN: {FirmInfoState.gstin ? FirmInfoState.gstin.substring(2, FirmInfoState.gstin.length - 3) : ""}
                  </div>
                  <div style={{ flexGrow: 1, textAlign: "right" }}>
                    Mobile: {FirmInfoState.phone}
                    <br /> Email: {FirmInfoState.email}
                  </div>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th align="left" width="1%" style={{ backgroundColor: "#bbb" }}>
                Bill To
            </th>
              <th align="left" width="50%">
                {billData.partyMaster.name}
              </th>
              <th
                align="left"
                width="30%"
                colSpan="2"
                style={{ backgroundColor: "#bbb" }}
              >
                {
                  billData.billing == "TAX" ? "TAX INVOICE" : "RETAIL INVOICE"
                }
              </th>
            </tr>
            <tr>
              <td className="border-b-0">Address</td>
              <td className="border-b-0">
                {billData.partyMaster.address}
              </td>
              <th align="left">
                Bill No
              <br />
              Bill Date
            </th>
              <th align="left">
                {billData.billNumber}
                <br />
                {moment(billData.billDate).format(dateFormat)}
              </th>
            </tr>
            <tr>
              <td className="border-b-0 border-t-0">Mobile</td>
              <td className="border-b-0 border-t-0">{billData.partyMaster.phone}</td>
              <td rowSpan="3">Order No</td>
              <td rowSpan="3"></td>
            </tr>
            <tr>
              <th className="border-b-0 border-t-0" align="left">
                GSTIN
            </th>
              <th className="border-b-0 border-t-0" align="left">
                {billData.partyMaster.gstin}
              </th>
            </tr>
            <tr>
              <td className=" border-t-0" align="left">
                State
            </td>
              <td className=" border-t-0" align="left">
                {geoStates.find(x => x.tin == billData.partyMaster.stateCode)?.stateName}
              </td>
            </tr>
          </tbody>
        </table>
        <div
          style={{
            display: "flex",
            border: "1px ridge #000",
            borderWidth: "0 2px 0 2px"
          }}
        >
          <div style={{ flexGrow: 1 }}>Transaport:</div>
          <div style={{ flexGrow: 1 }}>LR No.</div>
          <div style={{ flexGrow: 1 }}>
            LR Date:&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;/
        </div>
          <div style={{ flexGrow: 1 }}>Eway Bill Number:</div>
        </div>

        <div className="tbl" style={{ width: "100%" }}>
          <div className="tbl-body" style={{ width: "100%" }}>
            <section style={{ width: "100%" }}>
              <table border="1" width="100%" cellSpacing="0">
                <thead>
                  <tr>
                    <th align="left" width="10%">
                      Sr.
                  </th>
                    <th align="left" width="45%">
                      Item
                  </th>
                    <th align="left" width="15%">
                      Quantity
                  </th>
                    <th align="left" width="15%">
                      Rate
                  </th>
                    <th align="left" width="15%">
                      Amount
                  </th>
                  </tr>
                </thead>
                <tbody>

                  {(billData.billsDetail ?? []).map(function (bill, i) {
                    return (
                      <tr style={{ backgroundColor: "#f5f5f5 min-height: 200px" }}>
                        <td align="right" style={{ verticalAlign: "top" }}>{i + 1}</td>
                        <td style={{ verticalAlign: "top" }}>{bill.itemMaster.name + (bill.itemMaster.description ? ` (${bill.itemMaster.description})` : "")}</td>
                        <td align="right" style={{ verticalAlign: "top" }}>{bill.quantity}</td>
                        <td align="right" style={{ verticalAlign: "top" }}>{bill.rate}</td>
                        <td align="right" style={{ verticalAlign: "top" }}>{bill.amount}</td>
                      </tr>
                    )
                  })}
                </tbody>
                <tfoot>
                  <th align="right" className="border-r-0" colSpan="2">
                    Totals:
                  </th>
                  <th align="right">{billData.billsDetail.map(x => x.quantity).reduce((x, y) => x + y)}</th>
                  <th align="left"></th>
                  <th align="right">{billData.billsDetail.map(x => x.amount).reduce((x, y) => x + y)}</th>
                </tfoot>
              </table>
            </section>
          </div>

          <table
            style={{ width: "100%" }}
            border="1"
            width="100%"
            cellSpacing="0"
          >
            <tbody>
              <tr>
                <td className="border-b-0 border-t-0" rowSpan="5">
                  Rs.Thirty-two Thousand Four Hundred Seventy-four Only
              </td>
              </tr>
              <tr>
                <td className="border-t-0">SGST {billData.SGSTPercentage ?? 0}%</td>
                <td className="border-t-0">{billData.SGSTAmount ?? 0}</td>
              </tr>
              <tr>
                <td>CGST {billData.CGSTPercentage ?? 0}%</td>
                <td>{billData.CGSTAmount ?? 0}</td>
              </tr>
              <tr>
                <td>IGST {billData.IGSTPercentage ?? 0}%</td>
                <td>{billData.IGSTAmount ?? 0}</td>
              </tr>
              <tr>
                <th align="left" style={{ backgroundColor: "#bbb" }}>
                  NET AMOUNT
              </th>
                <th align="left" style={{ backgroundColor: "#bbb" }}>
                  {billData.netAmount ?? 0}
                </th>
              </tr>
            </tbody>
          </table>

          <table
            style={{ width: "100%" }}
            border="1"
            width="100%"
            cellSpacing="0"
          >
            <tbody>
              <tr>
                <td className="border-b-0 border-t-0" width="50%">
                  Bank Name:
                <br />
                A/c No
                <br />
                IFSC Code
              </td>
                <td className="border-b-0 border-t-0" rowSpan="2" align="right">
                  For,{FirmInfoState.firmName} <br />
                  <br />
                  <br />
                  <br />
                Authorised Signatorys
              </td>
              </tr>
              <tr>
                <td>
                  Receiver's Sign:
                <br />
                  <br />
                  <br />
                </td>
              </tr>
            </tbody>
          </table>

          <div className="tbl-head" style={{ width: "100%" }}>
            <header style={{ width: "100%" }}></header>
          </div>
          <div className="tbl-foot">
            <footer></footer>
          </div>
        </div>
      </div>
      : ""
  );
};

export default InvoicePrintTemplate;
