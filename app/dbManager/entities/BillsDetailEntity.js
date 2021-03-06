import { EntitySchema } from "typeorm";
import __BaseEntity from "./__BaseEntity";
const NAME = "BillsDetail";
const TABLE_NAME = "bills_dtl";
const TARGET_MODEL = import(`../models/BillsDetail`);
export default new EntitySchema({
  name: NAME,
  tableName: TABLE_NAME,
  target: TARGET_MODEL,
  columns: {
    ...__BaseEntity,
    description: {
      name: "description",
      type: "text",
      nullable: true,
    },
    quantity: {
      name: "quantity",
      type: "double",
      default: 0.0,
    },
    rate: {
      name: "rate",
      type: "double",
      default: 0.0,
    },
    amount: {
      name: "amount",
      type: "double",
      default: 0.0,
    },
    billsTransactionId: {
      name: "bill_trx_id",
      type: "integer",
    },
    itemMasterId:{
      name: "item_mst_id",
      type: "integer",
    },
    itemUnitMasterId:{
      name: "item_unit_mst_id",
      type: "integer",
    }
  },
  relations: {
    billsTransaction: {
      target: "BillsTransaction",
      type: "many-to-one",
      joinTable: true,
      cascade: true,
      joinColumn:{
        name:"bill_trx_id",
      },
    },
    itemMaster: {
      target: "ItemMaster",
      type: "many-to-one",
      joinTable: true,
      cascade: true,
      joinColumn:{
        name:"item_mst_id",
      },
    },
    itemUnitMaster: {
      target: "ItemUnitMaster",
      type: "many-to-one",
      joinTable: true,
      cascade: true,
      joinColumn:{
        name:"item_unit_mst_id",
      },
    },
  },
});
