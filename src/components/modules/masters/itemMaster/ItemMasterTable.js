import React from "react";
import CommonTable from "../../_common/CommonTable";

function ItemMasterTable(props) {
  const columns = [
    {
      title: "Code",
      dataIndex: "code",
    },
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title:"Group",
      dataIndex:"itemGroupMaster",
      render: x => x.name,
    },
    {
      title:"Unit",
      dataIndex:"itemUnitMaster",
      render: x => x.name,
    },
    {
      title:"Tax",
      dataIndex:"taxMaster",
      render: x => x.name,
    },
    {
      title:"HSN Code",
      dataIndex:"HSNCode"
    },
    {
      title:"Active",
      dataIndex:"isActive"
    }
  ];

  return <CommonTable columns={columns} {...props} />;
}

export default ItemMasterTable;
