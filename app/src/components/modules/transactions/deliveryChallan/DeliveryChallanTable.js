import React from "react";
import CommonTable from "../../_common/CommonTable";

function DeliveryChallanTable(props) {
  const columns = [
    {
      title: "Challan No",
      dataIndex: "challanNumber",
      width: '20%'
    },
    {
      title: "Voucher No",
      dataIndex: "voucherNumber",
      width: '20%'
    },
    {
      title: "Date",
      dataIndex: "challanDate",
      width: '50%',
    },
  ];

  return (<CommonTable
    columns={columns}
    {...props}
  />)
}

export default DeliveryChallanTable;
