const EntitySchema = require("typeorm").EntitySchema;
const __BaseEntity = require("./__BaseEntity");
const NAME = "DeliveryTransaction";
const TABLE_NAME = "delivery_trx";
const TARGET_MODEL = require(`../models/${NAME}`);
module.exports = new EntitySchema({
  name: NAME,
  tableName: TABLE_NAME,
  target: TARGET_MODEL,
  columns: {
    ...__BaseEntity,
    name: {
      name: "name",
      type: "text",
      nullable: false,
    },
    voucherNumber: {
      name: "voucher_number",
      type: "bigint",
      unique: true,
      nullable: false,
    },
    chalanNumber: {
      name: "chalan_number",
      type: "bigint",
      unique: true,
      nullable: false,
    },
    chalanDate: {
      name: "chalan_date",
      type: "date",
      nullable: false,
    },
    grossAmount: {
      name: "gross_amount",
      type: "double",
      default: 0.0,
    },
    netAmount: {
      name: "net_amount",
      type: "double",
      default: 0.0,
    },
    remarks: {
      name: "remarks",
      type: "text",
      nullable: true,
    },
    partyMaster:{
      name:"party_mst_id",
      type:"integer",
      nullable:false
    }
  },
  relations: {
    partyMaster: {
      target: "PartyMaster",
      type: "many-to-one",
      joinTable: true,
      cascade: true,
      joinColumn:{
        name:"party_mst_id",
      },
    },
  },
});
