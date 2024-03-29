const EntitySchema = require("typeorm").EntitySchema;
const __BaseEntity = require("./__BaseEntity");

const NAME = "SettingsMaster";
const TABLE_NAME = "settings_mst";
const {SettingsMaster} = require(`../models/SettingsMaster`);

module.exports = new EntitySchema({
  name: NAME,
  tableName: TABLE_NAME,
  target: SettingsMaster,
  columns: {
    ...__BaseEntity,
    key: {
      name: "key",
      type: "text",
      nullable: false,
      unique: true,
    },
    type: {
      type: "simple-enum",
      enum: ["STRING", "NUMBER", "SELECT", "MULTI_SELECT", "FILE","SECRET"],
      nullable: false,
    },
    options: {
      name: "options",
      type: "text",
      nullable: false,
    },
    description: {
      name: "description",
      type: "text",
      nullable: true,
    },
    defaultValue: {
      name: "default_value",
      type: "text",
      nullable: true,
    },
    currentValue: {
      name: "current_value",
      type: "text",
      nullable: true,
    },
    system: {
      name: "system",
      type: "boolean",
      default: false,
    },
  },
});
