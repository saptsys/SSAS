import moment from "moment";
import React from "react";
import CommonTable from "../../../_common/CommonTable";
import { dateFormat } from "../../../../../../Constants/Formats";

export const printSalesInvoice = (id) => {
  window.promiseIpc.send("Print/", {
    path: "print/sales/" + id,
    options: {
      silent: true
    }
  }).then(console.log).catch(err => errorDialog(err.message))
}

function SalesInvoiceTable(props) {
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
    printBtnHandler={(cell, row, index) => {
      printSalesInvoice(row.id)
    }}
  />)
}

export default SalesInvoiceTable;
