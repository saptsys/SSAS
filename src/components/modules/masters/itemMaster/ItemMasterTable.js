
import React from "react";
import CommonTable from "../../_common/CommonTable";

function ItemMasterTable(props) {
  const columns = [
    {
      title: "Id",
      dataIndex: "id",
    },
    {
      title: "name",
      dataIndex: "name",
    },
    {
      title: "code",
      dataIndex: "code",
    },
  ];

  return <CommonTable columns={columns} {...props} />;
}

export default ItemMasterTable;
