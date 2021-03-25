import moment from "moment";
import React from "react";
import CommonTable from "../../../_common/CommonTable";
import { dateFormat } from "../../../../../../Constants/Formats";

function PurchaseReturnTable(props) {

  const columns = [
    {
      title: "Bill No",
      dataIndex: "billNumber",
      align: 'center',
      width: '13%',
      render: (cell, row) => row.billing + ' / ' + cell
    },
    {
      title: "Date",
      dataIndex: "billDate",
      width: '13%',
      render: cell => moment(cell).format(dateFormat)
    },
    {
      title: "Party",
      dataIndex: "partyName",
      width: '23%',
    },
    {
      title: "Against Bill No",
      dataIndex: "againstBillNumber",
      align: 'center',
      width: '15%',
      render: (cell, row) => row.againstBilling + ' / ' + cell
    },
    {
      title: "Against Bill Date",
      dataIndex: "againstBillDate",
      width: '15%',
      render: cell => moment(cell).format(dateFormat)
    },
    {
      title: 'Net Amount',
      dataIndex: 'netAmount',
      align: 'right',
      width: '13%'
    },
  ];

  return (<CommonTable
    columns={columns}
    {...props}
  />)
}

export default PurchaseReturnTable;
