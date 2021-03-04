import React from "react";
import { isActiveColumnRenderer } from "../../../table/columnRenderers";
import CommonTable from "../../_common/CommonTable";

function ItemGroupMasterTable(props) {
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
      align: 'right',
      width: '15%',
    },
    {
      title: "Active",
      dataIndex: "isActive",
      render: isActiveColumnRenderer,
      width: "70px",
      align: 'center',
      width: '15%',
    },
  ];

  return <CommonTable columns={columns} {...props} />;
}

export default ItemGroupMasterTable;
