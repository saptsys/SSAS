import React from "react";
import { isActiveColumnRenderer } from "../../../table/columnRenderers";
import CommonTable from "../../_common/CommonTable";

function ItemGroupMasterTable(props) {
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
      title: "Items",
      dataIndex: "containsItems"
    },
    {
      title: "Active",
      dataIndex: "isActive",
      render: isActiveColumnRenderer,
      width:"70px",
      align:'center'
    },
  ];

  return <CommonTable columns={columns} {...props} />;
}

export default ItemGroupMasterTable;
