const EntitySchema = require("typeorm").EntitySchema;
const __BaseEntity = require("./__BaseEntity");
const NAME = "BillsDetail";
const TABLE_NAME = "bills_dtl";
const { BillsDetail } = require("../models/BillsDetail");
module.exports = new EntitySchema({
    name: NAME,
    tableName: TABLE_NAME,
    target: BillsDetail,
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
        itemMasterId: {
            name: "item_mst_id",
            type: "integer",
        },
        itemUnitMasterId: {
            name: "item_unit_mst_id",
            type: "integer",
        },
        otherPercentage: {
            name: "other_percentage",
            type: "double",
            default: 0.0,
        },
        otherAmount: {
            name: "other_amount",
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
        grossAmount: {
            name: "gross_amount",
            type: "double",
            default: 0.0,
        }
    },
    relations: {
        billsTransaction: {
            target: "BillsTransaction",
            type: "many-to-one",
            joinTable: true,
            cascade: true,
            inverseSide: 'id',
            joinColumn: {
                name: "bill_trx_id",
                referencedColumnName: 'id'
            },
        },
        itemMaster: {
            target: "ItemMaster",
            type: "many-to-one",
            joinTable: true,
            cascade: true,
            joinColumn: {
                name: "item_mst_id",
            },
        },
        itemUnitMaster: {
            target: "ItemUnitMaster",
            type: "many-to-one",
            joinTable: true,
            cascade: true,
            joinColumn: {
                name: "item_unit_mst_id",
            },
        },
    },
});
