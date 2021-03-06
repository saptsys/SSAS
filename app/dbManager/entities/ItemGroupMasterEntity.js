import { EntitySchema } from "typeorm";
import __BaseEntity from "./__BaseEntity";

const NAME = "ItemGroupMaster";
const TABLE_NAME = "item_group_mst";
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
        referencedColumnName: 'itemGroupMaster'
      },
      inverseSide: 'itemGroupMaster',
      type: "one-to-many",
    }
  }
});
