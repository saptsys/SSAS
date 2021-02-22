import React from "react";
import CommonTable from "../../_common/CommonTable";
import { isActiveColumnRenderer } from "../../../table/columnRenderers";

function ItemMasterTable(props) {
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      width: '15%',
    },
    {
      title: "Code",
      dataIndex: "code",
      width: '10%',
    },
    {
      title:"Group",
      dataIndex:"itemGroupMasterName",
      width: '15%',
    },
    {
      title:"Unit",
      dataIndex:"itemUnitMasterName",
      width: '15%',
    },
    {
      title:"Tax",
      dataIndex:"taxMasterName",
      width: '15%',
    },
    {
      title:"HSN Code",
      dataIndex:"HSNCode",
      width: '10%',
    },
    {
      title: "Active",
      dataIndex: "isActive",
      render: isActiveColumnRenderer,
      width: "70px",
      align: 'center',
      width: '5%',
    }
  ];

  return <CommonTable columns={columns} {...props} />;
}

export default ItemMasterTable;
