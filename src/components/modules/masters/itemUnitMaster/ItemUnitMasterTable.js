
import React from "react";
import CommonTable from "../../_common/CommonTable";

function ItemUnitMasterTable(props) {
  const columns = [
    {
      title: "Id",
      dataIndex: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Code",
      dataIndex: "code",
    },
    {
      title:"Items",
      dataIndex:"containsItems"
    },
    {
      title: "Active",
      dataIndex: "isActive",
    },
  ];
  return <CommonTable columns={columns} {...props} />;
}

export default ItemUnitMasterTable;
