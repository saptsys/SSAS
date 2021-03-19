const EntitySchema = require("typeorm").EntitySchema;
const __BaseEntity = require("./__BaseEntity");
const NAME = "BillsTransaction";
const TABLE_NAME = "bill_trx";
const { BillsTransaction } = require("./../models/BillsTransaction");
const { ALL_BILLINGS,ALL_TAGS } = require("../../Constants/Transactionals")

module.exports = new EntitySchema({
  name: NAME,
  tableName: TABLE_NAME,
  target: BillsTransaction,
  columns: {
    ...__BaseEntity,
    tag: {
      name: "tag",
      type: "simple-enum",
      enum: ALL_TAGS,
      nullable: false,
    },
    billing: {
      name: "billing",
      type: "simple-enum",
      enum: ALL_BILLINGS,
      nullable: false,
    },
    billNumber: {
      name: "bill_number",
      type: "bigint",
      nullable: false,
    },
    billDate: {
      name: "bill_date",
      type: "date",
      nullable: false,
    },
    voucherNumber: {
      name: "voucher_number",
      type: "bigint",
      nullable: false,
    },
    challanNumber: {
      name: "chalan_number",
      type: "bigint",
      nullable: true,
    },
    chalanDate: {
      name: "chalan_date",
      type: "date",
      nullable: true,
    },
    dueDate: {
      name: "due_date",
      type: "date",
      nullable: true,
    },
    grossAmount: {
      name: "gross_amount",
      type: "double",
      default: 0.0,
    },
    discountPercentage: {
      name: "discount_percentage",
      type: "double",
      default: 0.0,
    },
    discountAmount: {
      name: "discount_amount",
      type: "double",
      default: 0.0,
    },
    SGSTPercentage: {
      name: "sgst_percentage",
      type: "double",
      default: 0.0,
    },
    SGSTAmount: {
      name: "sgst_amount",
      type: "double",
      default: 0.0,
    },
    CGSTPercentage: {
      name: "cgst_percentage",
      type: "double",
      default: 0.0,
    },
    CGSTAmount: {
      name: "cgst_amount",
      type: "double",
      default: 0.0,
    },
    IGSTPercentage: {
      name: "igst_percentage",
      type: "double",
      default: 0.0,
    },
    IGSTAmount: {
      name: "igst_amount",
      type: "double",
      default: 0.0,
    },
    ferightPercentage: {
      name: "freight_percentage",
      type: "double",
      default: 0.0,
    },
    freightAmount: {
      name: "freight_amount",
      type: "double",
      default: 0.0,
    },
    commisionPercentage: {
      name: "commision_percentage",
      type: "double",
      default: 0.0,
    },
    commisionAmount: {
      name: "commision_amount",
      type: "double",
      default: 0.0,
    },
    otherAmount: {
      name: "other_amount",
      type: "double",
      default: 0.0,
    },
    netAmount: {
      name: "net_amount",
      type: "double",
      default: 0.0,
    },
    taxableAmount: {
      name: "taxable_amount",
      type: "double",
      default: 0.0,
    },
    remarks: {
      name: "remarks",
      type: "text",
      nullable: true,
    },
    partyMasterId: {
      name: "party_mst_id",
      type: "integer",
    },
    billingAddress: {
      name: "bill_address",
      type: "text",
      nullable: true,
    },
  },
  relations: {
    partyMaster: {
      target: "PartyMaster",
      type: "many-to-one",
      joinTable: true,
      cascade: true,
      joinColumn: {
        name: "party_mst_id",
      },
    },
    billDetails: {
      target: "BillsDetail",
      joinColumn: {
        name: "id",
        referencedColumnName: 'billsTransactionId'
      },
      inverseSide: 'billsTransaction',
      type: "one-to-many",
    }
  },
});
