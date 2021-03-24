import moment from "moment";
import React from "react";
import CommonTable from "../../../_common/CommonTable";
import { dateFormat } from "../../../../../../Constants/Formats";

function PurchaseInvoiceTable(props) {
  const columns = [
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

  ];

  return (<CommonTable
    columns={columns}
    {...props}
  />)
}

export default PurchaseInvoiceTable;
