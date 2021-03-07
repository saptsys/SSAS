const EntitySchema = require("typeorm").EntitySchema;
const __BaseEntity = require("./__BaseEntity");
const NAME = "ItemMaster";
const TABLE_NAME = "item_mst";
const {ItemMaster} = require(`../models/ItemMaster`);
module.exports = new EntitySchema({
  name: NAME,
  tableName: TABLE_NAME,
  target: ItemMaster,
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
    salePrice: {
      name: "sale_price",
      type: "double",
      default: 0.0,
      nullable: true,
    },
    purchasePrice: {
      name: "purchase_price",
      type: "double",
      default: 0.0,
      nullable: true,

    },
    itemTaxable: {
      name: "item_taxable",
      type: "boolean",
      default: false,
      nullable: true,

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
      nullable: true,

    },
    additionalTax: {
      name: "additional_tax",
      type: "double",
      default: 0.0,
      nullable: true,

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
      nullable: true,

    },
    itemUnitMasterId: {
      name: "item_unit_mst_id",
      type: "integer",
      nullable: true,
    },
    itemGroupMasterId: {
      name: "item_group_mst_id",
      type: "integer",
      nullable: true,
    },
    taxMasterId: {
      name: "tax_mst_id",
      type: "integer",
      nullable: true,
    },
  },
  relations: {
    itemUnitMaster: {
      target: "ItemUnitMaster",
      type: "many-to-one",
      cascade: true,
      nullable: true,
      inverseSide: 'id',
      joinColumn: {
        name: "item_unit_mst_id",
        referencedColumnName: 'id'
      },
    },
    itemGroupMaster: {
      target: "ItemGroupMaster",
      type: "many-to-one",
      joinTable: true,
      cascade: false,
      nullable: true,
      inverseSide: 'id',
      joinColumn: {
        name: "item_group_mst_id",
        referencedColumnName: 'id'
      },
    },
    taxMaster: {
      target: "TaxMaster",
      type: "many-to-one",
      joinTable: true,
      cascade: true,
      nullable: true,
      inverseSide: 'id',
      joinColumn: {
        name: "tax_mst_id",
        referencedColumnName: 'id'
      },
    },
  },
});
