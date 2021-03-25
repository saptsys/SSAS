import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from "react-router-dom";

import { DeliveryChallanActions } from '../../../_redux/actionFiles/DeliveryChallanRedux';
import moment from "moment"
import { dateFormat } from "../../../../Constants/Formats";
import './printStyle.less';
const ChalanPrintTemplate = () => {
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
    dispatch(DeliveryChallanActions.getByIdWithDetails(id)).then(setBillData)
  }, [])
  let padding = 20;

  const getRenderData = () => {
    return (
      billData ?
        <div>
          <table style={{ width: "100%" }} cellspacing="0">
            <thead style={{ width: "100%" }}>
              <tr>
                <th colspan="4" style={{ textAlign: "center" }}>
                  <h5 style={{ margin: "5px" }}>|| Shree Ganeshai Namah ||</h5>
                  <h5 style={{ margin: "5px" }}>Delivery Challan</h5>
                  <h3 style={{ margin: "5px" }}>{FirmInfoState.firmName}</h3>
                  <h5 style={{ margin: "5px" }}>
                    {FirmInfoState.address}
                  </h5>
                  {
                    FirmInfoState.phone ?
                      <h5 style={{ margin: "5px" }}>{FirmInfoState.phone} </h5>
                      :
                      ""
                  }
                </th>
              </tr>
              <tr>
                <td colspan="4">
                  <div style={{ display: "flex" }}>
                    <div style={{ flexGrow: "0.05", textAlign: "left" }}>
                      <strong>M/S, </strong>
                    </div>
                    <div style={{ flexGrow: 0.2, textAlign: "left", width: "200px" }}>
                      <strong>{billData.partyMaster.name}</strong>
                      <div>{billData.partyMaster.address}</div>
                      <div>GSTIN : {billData.partyMaster.gstin}</div>
                    </div>
                    <div style={{ flexGrow: 1, textAlign: "right" }}>
                      <div>Chalan No : {billData.challanNumber}</div>
                      <div>Date : {moment(billData.challanDate).format(dateFormat)}</div>
                    </div>
                  </div>
                </td>
              </tr>
            </thead>
          </table>

          <div className="tbl" style={{ width: "100%" }}>
            <div className="tbl-body" style={{ width: "100%" }}>
              <section style={{ width: "100%" }}>
                <table border="1" width="100%" cellspacing="0">
                  <thead>
                    <tr>
                      <th style={{ textAlign: "left" }} width="10%">Sr.</th>
                      <th style={{ textAlign: "left" }} width="45%">Item</th>
                      <th style={{ textAlign: "right" }} width="15%">Quantity</th>
                      <th style={{ textAlign: "right" }} width="15%">Rate</th>
                      <th style={{ textAlign: "right" }} width="15%">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* <tr style={{ backgroundColor: "#f5f5f5 min-height: 200px" }}>
                  <td style={{textAlign:"right"}} style={{ verticalAlign: "top" }}>1</td>
                  <td style={{ verticalAlign: "top" }}>Item 1</td>
                  <td style={{textAlign:"right"}} style={{ verticalAlign: "top" }}>3</td>
                  <td style={{textAlign:"right"}} style={{ verticalAlign: "top" }}>120</td>
                  <td style={{textAlign:"right"}} style={{ verticalAlign: "top" }}>693.25</td>
                </tr> */}
                    {(billData.deliveryDetails ?? []).map(function (chalan, i) {
                      return (
                        <tr style={{ backgroundColor: "#f5f5f5 min-height: 200px" }}>
                          <td style={{ textAlign: "right", verticalAlign: "top" }}>{i + 1}</td>
                          <td style={{ verticalAlign: "top" }}>{chalan.itemMaster.name + (chalan.itemMaster.description ? ` (${chalan.itemMaster.description})` : "")}</td>
                          <td style={{ textAlign: "right", verticalAlign: "top" }} >{chalan.quantity}</td>
                          <td style={{ textAlign: "right", verticalAlign: "top" }} >{chalan.rate}</td>
                          <td style={{ textAlign: "right", verticalAlign: "top" }} >{chalan.amount}</td>
                        </tr>
                      )
                    })}

                  </tbody>
                  <tfoot>
                    <tr>
                      <th style={{ textAlign: "right" }} className="border-r-0" colspan="2">Total:</th>
                      <th style={{ textAlign: "right" }}>{billData.deliveryDetails.map(x => x.quantity).reduce((x, y) => x + y)}</th>
                      <th style={{ textAlign: "left" }}></th>
                      <th style={{ textAlign: "right" }}>{billData.deliveryDetails.map(x => x.amount).reduce((x, y) => x + y)}</th>
                    </tr>
                    <tr>
                      <th style={{ textAlign: "right" }} className="border-r-0" colspan="2">
                        Net Amount:
                </th>
                      <th style={{ textAlign: "left" }}></th>
                      <th style={{ textAlign: "left" }}></th>
                      <th style={{ textAlign: "right" }}>{billData.deliveryDetails.map(x => x.amount).reduce((x, y) => x + y)}</th>
                    </tr>
                  </tfoot>
                </table>
              </section>
            </div>

            <table style={{ width: "100%" }} border="0" width="100%" cellspacing="0">
              <tr>
                <div style={{ display: "flex" }}>
                  <div style={{ flexGrow: 1, textAlign: "left" }}>
                    GSTIN: {FirmInfoState.gstin}
                  </div>
                  <div style={{ flexGrow: 1, textAlign: "right" }}>
                    For , <strong>{FirmInfoState.firmName}</strong>
                    <br /><br /><br /><br /><br />
                  </div>
                </div>
              </tr>
            </table>
          </div>
        </div>
        : ""
    )
  }

  return (
    <body class="a5-half">
      { getRenderData()}
    </body>

  );
};

export default ChalanPrintTemplate;
