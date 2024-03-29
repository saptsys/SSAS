const EntitySchema = require("typeorm").EntitySchema;
const __BaseEntity = require("./__BaseEntity");
const NAME = "DeliveryDetail";
const TABLE_NAME = "delivery_dtl";
const {DeliveryDetail} = require(`../models/DeliveryDetail`);
module.exports = new EntitySchema({
  name: NAME,
  tableName: TABLE_NAME,
  target: DeliveryDetail,
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
    deliveryTransactionId:{
      name:"delivery_trx_id",
      type:"integer",
      nullable:false
    },
    itemMasterId:{
      name:"item_mst_id",
      type:"integer",
      nullable:false
    },
    itemUnitMasterId:{
      name:"item_unit_mst_id",
      type:"integer",
      nullable:false
    },
  },
  relations: {
    // deliveryTransaction: {
    //   target: "DeliveryTransaction",
    //   type: "many-to-one",
    //   joinTable: true,
    //   cascade: true,
    //   joinColumn:{
    //     name:"delivery_trx_id",
    //   },
    // },
    deliveryTransaction: {
      target: "DeliveryTransaction",
      type: "many-to-one",
      cascade: true,
      nullable: true,
      inverseSide: 'id',
      joinColumn: {
        name: "delivery_trx_id",
        referencedColumnName: 'id'
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
