
import React from "react";
import CommonTable from "../../_common/CommonTable";

function ItemUnitMasterTable(props) {
  const columns = [
    {
      title: "Id",
      dataIndex: "id",
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
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

export default ItemUnitMasterTable;
