const EntitySchema = require("typeorm").EntitySchema;
const __BaseEntity = require("./__BaseEntity");
const NAME = "ItemMaster";
const TABLE_NAME = "item_mst";
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
    code: {
      name: "code",
      type: "text",
      nullable: false,
      unique: true,
    },
    description: {
      name: "description",
      type: "text",
      nullable: true,
    },
    date: {
      name: "date",
      type: "date",
    },
    salePrice: {
      name: "sale_price",
      type: "double",
      default: 0.0,
    },
    purchasePrice: {
      name: "purchase_price",
      type: "double",
      default: 0.0,
    },
    itemTaxable: {
      name: "item_taxable",
      type: "boolean",
      default: false,
    },
    HSNCode: {
      name: "hsn_code",
      type: "text",
      nullable: true,
      unique: true,
    },
    VATRate: {
      name: "vat_rate",
      type: "double",
      default: 0.0,
    },
    additionalTax: {
      name: "additional_tax",
      type: "double",
      default: 0.0,
    },
    isActive: {
      name: "is_active",
      type: "boolean",
      default: true,
    },
    system: {
      name: "system",
      type: "boolean",
      default: false,
    },
    itemUnitMaster: {
      name: "item_unti_mst_id",
      type: "integer",
      nullable: true,
    },
    itemGroupMaster: {
      name: "item_group_mst_id",
      type: "integer",
      nullable: true,
    },
    taxMaster: {
      name: "tax_mst_id",
      type: "integer",
      nullable: true,
    },
  },
  relations: {
    itemUnitMaster: {
      target: "ItemUnitMaster",
      type: "many-to-one",
      joinTable: true,
      cascade: true,
      nullable: true,
      joinColumn:{
        name:"item_unti_mst_id",
      },
    },
    itemGroupMaster: {
      target: "ItemGroupMaster",
      type: "many-to-one",
      joinTable: true,
      cascade: true,
      nullable: true,
      joinColumn:{
        name:"item_group_mst_id",
      },
    },
    taxMaster: {
      target: "TaxMaster",
      type: "many-to-one",
      joinTable: true,
      cascade: true,
      nullable: true,
      joinColumn:{
        name:"tax_mst_id",
      },
    },
  },
});
