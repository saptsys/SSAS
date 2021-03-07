const EntitySchema = require("typeorm").EntitySchema;
const __BaseEntity = require("./__BaseEntity");
const { ItemMaster } = require('../models/index')

const NAME = "ItemUnitMaster";
const TABLE_NAME = "item_unit_mst";
const {ItemUnitMaster} = require(`../models/ItemUnitMaster`)

module.exports = new EntitySchema({
  name: NAME,
  tableName: TABLE_NAME,
  target: ItemUnitMaster,
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
      unique: true
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
  },
  relations: {
    items: {
      target: "ItemMaster",
      joinColumn: {
        name: "id",
        referencedColumnName: 'itemUnitMaster'
      },
      inverseSide: 'itemUnitMaster',
      type: "one-to-many",
    }
  }
});
