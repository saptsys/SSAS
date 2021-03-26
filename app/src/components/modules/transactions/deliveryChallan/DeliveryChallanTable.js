import moment from "moment";
import React from "react";
import CommonTable from "../../_common/CommonTable";
import { dateFormat } from "../../../../../Constants/Formats";
import { errorDialog } from "../../../../helpers/dialogs";

function DeliveryChallanTable(props) {
  const columns = [
    {
      title: "Challan No",
      dataIndex: "challanNumber",
      align: 'right',
      width: '15%'
    },
    // {
    //   title: "Voucher No",
    //   dataIndex: "voucherNumber",
    //   width: '20%'
    // },
    {
      title: "Date",
      dataIndex: "challanDate",
      width: '20%',
      render: cell => moment(cell).format(dateFormat)
    },
    {
      title: "Party",
      dataIndex: "partyName",
      width: '25%',
    },
    {
      title: 'Gross Amount',
      dataIndex: 'grossAmount',
      align: 'right',
      width: '20%'
    },
    {
      title: "Remarks",
      dataIndex: "remarks",
      width: '20%'
    },

  ];

  return (<CommonTable
    columns={columns}
    {...props}
  />)
}

export default DeliveryChallanTable;
