import { EntitySchema } from "typeorm";
import __BaseEntity from "./__BaseEntity";
import { ItemMaster } from '../models/index';

const NAME = "ItemUnitMaster";
const TABLE_NAME = "item_unit_mst";
const TARGET_MODEL = require(`../models/${NAME}`)

export default new EntitySchema({
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
