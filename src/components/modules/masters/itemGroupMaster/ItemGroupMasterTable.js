import React from "react";
import CommonTable from "../../_common/CommonTable";

function ItemGroupMasterTable(props) {
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
    {
      title:"items",
      dataIndex:"containsItems"
    },
    {
      title: "description",
      dataIndex: "description",
    },
    {
      title: "active",
      dataIndex: "isActive",
    },
    {
      title: "system",
      dataIndex: "system",
    },
  ];

  return <CommonTable columns={columns} {...props} />;
}

export default ItemGroupMasterTable;
