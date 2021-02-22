
import React from "react";
import { isActiveColumnRenderer } from "../../../table/columnRenderers";
import CommonTable from "../../_common/CommonTable";

function ItemUnitMasterTable(props) {
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      width: '25%',
    },
    {
      title: "Code",
      dataIndex: "code",
      width: '15%',
    },
    {
      title: "Items",
      dataIndex: "containsItems",
      width: '15%',
    },
    {
      title: "Active",
      dataIndex: "isActive",
      render: isActiveColumnRenderer,
      width:'80px',
      align:'center',
      width: '15%',
    },
  ];
  return <CommonTable columns={columns} {...props} />;
}

export default ItemUnitMasterTable;
