import { EntitySchema } from "typeorm";
import __BaseEntity from "./__BaseEntity";
import AccountTypes from '../../Constants/AccountTypes';

const NAME = "PartyMaster";
const TABLE_NAME = "party_mst";
const TARGET_MODEL = require(`../models/PartyMaster`);

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
    type: {
      type: "simple-enum",
      enum: AccountTypes.map(x => x.value),
      nullable: false,
    },
    phone: {
      name: "phone",
      type: "text",
      nullable: true,
    },
    mobile: {
      name: "mobile",
      type: "text",
      nullable: true,
    },
    address: {
      name: "address",
      type: "text",
      nullable: true,
    },
    email: {
      name: "email",
      type: "text",
      nullable: true,
    },
    city: {
      name: "city",
      type: "text",
      nullable: true,
    },
    stateCode: {
      name: "state_code",
      type: "integer",
      nullable: false,
    },
    isActive: {
      name: "is_active",
      type: "boolean",
      default: true,
    },
    gstin: {
      name: "gstin",
      type: "text",
      nullable: true,
    },
    pan: {
      name: "pan",
      type: "text",
      nullable: true,
    },
    system: {
      name: "system",
      type: "boolean",
      default: false,
    }
  },
});
