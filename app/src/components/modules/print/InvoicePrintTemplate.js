import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from "react-router-dom";

import { SalesInvoiceActions } from '../../../_redux/actionFiles/SalesInvoiceRedux';
import moment from "moment"
import { dateFormat } from "../../../../Constants/Formats";
import geoStates from "../../../../Constants/States";
import './printStyle.less';
import { numberCurrencyIn as numToWords } from "../../../Helpers/NumToWord";
import commaNumber from "comma-number";

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
      mobile: state.FirmInfo.data?.firms?.find(x => x.id && x.default)?.mobile,
      email: state.FirmInfo.data?.firms?.find(x => x.id && x.default)?.email,
    },
    SettingsMasterState: {
      list: state.SettingsMaster.list
    }
  }))
  console.log(FirmInfoState)
  useEffect(() => {
    dispatch(SalesInvoiceActions.getByIdWithDetails(id)).then(setBillData)
  }, [])
  let padding = 20;
  const getRenderData = () => {
    return (billData ?
      <div>
        <table style={{ width: "100%" }} border="0" cellSpacing="0">
          <thead style={{ width: "100%" }}>
            <tr className={"b-bottom"}>
              <th colSpan="4" style={{ textAlign: "center", verticalAlign: "center" }}>
                <h2>{FirmInfoState.firmName}</h2>
                <p>{FirmInfoState.address}</p>
              </th>
            </tr>
            <tr className={"b-bottom"}>
              <th colSpan="4">
                <div style={{ display: "flex" }}>
                  <div style={{ flexGrow: 1, textAlign: "left" }}>
                    GSTIN: {FirmInfoState.gstin}
                    <br /> PAN: {FirmInfoState.gstin ? FirmInfoState.gstin.substring(2, FirmInfoState.gstin.length - 3) : ""}
                  </div>
                  <div style={{ flexGrow: 1, textAlign: "right" }}>
                    Mobile: {FirmInfoState.mobile}
                    <br /> Email: {FirmInfoState.email}
                  </div>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th className={"b-right"} style={{ textAlign: "left", backgroundColor: "#bbb" }} width="1%" >
                Bill To
              </th>
              <th style={{ textAlign: "left" }} width="50%">
                {billData.partyMaster.name}
              </th>
              <th
                width="30%"
                colSpan="2"
                style={{ backgroundColor: "#bbb" }}
                className="b-all"
              >
                {
                  billData.billing == "TAX" ? "TAX INVOICE" : "RETAIL INVOICE"
                }
              </th>
            </tr>
            <tr>
              <td className="border-b-0 b-right">Address</td>
              <td className="border-b-0">
                {billData.partyMaster.address}
              </td>
              <th className="b-all" style={{ textAlign: "left" }}>
                Bill No
              <br />
            Bill Date
          </th>
              <th style={{ textAlign: "left" }}>
                {billData.billNumber}
                <br />
                {moment(billData.billDate).format(dateFormat)}
              </th>
            </tr>
            <tr>
              <td className="border-b-0 border-t-0 b-right">Mobile</td>
              <td className="border-b-0 border-t-0 b-right">{billData.partyMaster.phone}</td>
              <td rowSpan="3" className="border-b-0 border-t-0 b-all">Order No</td>
              <td rowSpan="3"></td>
            </tr>
            <tr>
              <th className="border-b-0 border-t-0 b-right" style={{ textAlign: "left" }}>
                GSTIN
          </th>
              <th className="border-b-0 border-t-0" style={{ textAlign: "left" }}>
                {billData.partyMaster.gstin}
              </th>
            </tr>
            <tr>
              <td className=" b-right border-t-0" style={{ textAlign: "left" }}>
                State
          </td>
              <td className=" border-t-0" style={{ textAlign: "left" }}>
                {geoStates.find(x => x.tin == billData.partyMaster.stateCode)?.stateName}
              </td>
            </tr>
          </tbody>
        </table>
        <div
          style={{
            display: "flex",
          }}
          className="b-top"
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
                    <th style={{ textAlign: "left" }} width="10%">
                      Sr.
                </th>
                    <th style={{ textAlign: "left" }} width="45%">
                      Item
                </th>
                    <th style={{ textAlign: "right" }} width="15%">
                      Quantity
                </th>
                    <th style={{ textAlign: "right" }} width="15%">
                      Rate
                </th>
                    <th style={{ textAlign: "right" }} width="15%">
                      Amount
                </th>
                  </tr>
                </thead>
                <tbody>

                  {(billData.billsDetail ?? []).map(function (bill, i) {
                    return (
                      <tr style={{ backgroundColor: "#f5f5f5 min-height: 200px" }}>
                        <td style={{ textAlign: "right", verticalAlign: "top" }}>{i + 1}</td>
                        <td style={{ verticalAlign: "top" }}>{bill.itemMaster.name + (bill.itemMaster.description ? ` (${bill.itemMaster.description})` : "")}</td>
                        <td style={{ textAlign: "right", verticalAlign: "top" }} >{bill.quantity}</td>
                        <td style={{ textAlign: "right", verticalAlign: "top" }} >₹ {commaNumber(bill.rate)}</td>
                        <td style={{ textAlign: "right", verticalAlign: "top" }} >₹ {commaNumber(bill.amount)}</td>
                      </tr>
                    )
                  })}
                </tbody>
                <tfoot>
                  <th style={{ textAlign: "right" }} className="border-r-0" colSpan="2">
                    Totals:
                </th>
                  <th style={{ textAlign: "right" }}>{billData.billsDetail.map(x => x.quantity).reduce((x, y) => x + y)}</th>
                  <th style={{ textAlign: "left" }}></th>
                  <th style={{ textAlign: "right" }}>₹ {commaNumber(billData.billsDetail.map(x => x.amount).reduce((x, y) => x + y))}</th>
                </tfoot>
              </table>
            </section>
          </div>

          <table
            style={{ width: "100%" }}
            border="0"
            width="100%"
            cellSpacing="0"
            className="nonBreakable"
          >
            <tbody className="b-bottom">
              <tr>
                <td className="b-right" rowSpan="5" style={{ verticalAlign: "top", }}>
                  {numToWords(billData.netAmount ?? 0)}
                </td>
              </tr>
              <tr>
                <td className="b-right">SGST {billData.SGSTPercentage ?? 0}%</td>
                <td className="border-t-0" style={{ textAlign: "right" }}>₹ {commaNumber(billData.SGSTAmount ?? 0)}</td>
              </tr>
              <tr>
                <td className="b-right">CGST {billData.CGSTPercentage ?? 0}%</td>
                <td style={{ textAlign: "right" }}>₹ {commaNumber(billData.CGSTAmount ?? 0)}</td>
              </tr>
              <tr>
                <td className="b-right">IGST {billData.IGSTPercentage ?? 0}%</td>
                <td style={{ textAlign: "right" }}>₹ {commaNumber(billData.IGSTAmount ?? 0)}</td>
              </tr>
              <tr>
                <th className="b-right" style={{ textAlign: "left", backgroundColor: "#bbb" }}>
                  NET AMOUNT
            </th>
                <th style={{ textAlign: "right", backgroundColor: "#bbb" }} >
                  ₹ {commaNumber(billData.netAmount ?? 0)}
                </th>
              </tr>
            </tbody>
          </table>

          <table
            style={{ width: "100%" }}
            border="0"
            width="100%"
            cellSpacing="0"
            className="nonBreakable b-bottom"
          >
            <tbody>
              <tr>
                <td className="b-bottom" width="50%">
                  Bank Name:
                  <br />
                  A/c No
                  <br />
                  IFSC Code
                </td>
                <td className="b-left" rowSpan="2" style={{ textAlign: "right" }}>
                  For,{FirmInfoState.firmName} <br />
                  <br />
                  <br />
                  <br />
                  Authorised Signatory
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
      : "");
  }
  return (
    <body class="a4" className="b-top b-bottom b-left b-right">
      { getRenderData()}
    </body>

  );
};

export default InvoicePrintTemplate;
