import React from "react";
import CommonTable from "../../_common/CommonTable";

function ItemMasterTable(props) {
  const columns = [
    {
      title: "Id",
      dataIndex: "id",
    },
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
      dataIndex:"itemGroupMasterName"
    },
    {
      title:"Unit",
      dataIndex:"itemUnitMasterName"
    },
    {
      title:"Tax",
      dataIndex:"taxMasterName"
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
