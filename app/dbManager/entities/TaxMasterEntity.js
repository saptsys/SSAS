const EntitySchema = require("typeorm").EntitySchema;
const __BaseEntity = require("./__BaseEntity");

const NAME = "TaxMaster";
const TABLE_NAME = "tax_mst";
const {TaxMaster} = require(`../models/TaxMaster`)

module.exports = new EntitySchema({
  name: NAME,
  tableName: TABLE_NAME,
  target: TaxMaster,
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
      unique:true
    },
    description: {
      name: "description",
      type: "text",
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
    },
    taxPercentage:{
      name:"tax_percentage",
      type:"double",
      nullable:false,
    }
  },
  relations: {
    items: {
      target: "ItemMaster",
      joinColumn: {
        name: "id",
        referencedColumnName: 'taxMaster'
      },
      inverseSide: 'taxMaster',
      type: "one-to-many",
    }
  }
});
