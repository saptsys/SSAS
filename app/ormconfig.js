const DB_FILES_FOLDER = "./dbManager"
import BillsDetailEntity from "./dbManager/entities/BillsDetailEntity"
import BillsTransactionEntity from "./dbManager/entities/BillsTransactionEntity"
import DeliveryDetailEntity from "./dbManager/entities/DeliveryDetailEntity"
import DeliveryTransactionEntity from "./dbManager/entities/DeliveryTransactionEntity"
import ItemGroupMasterEntity from "./dbManager/entities/ItemGroupMasterEntity"
import ItemMasterEntity from "./dbManager/entities/ItemMasterEntity"
import ItemUnitMasterEntity from "./dbManager/entities/ItemUnitMasterEntity"
import PartyMasterEntity from "./dbManager/entities/PartyMasterEntity"
import SettingsMasterEntity from "./dbManager/entities/SettingsMasterEntity"
import TaxMasterEntity from "./dbManager/entities/TaxMasterEntity"

const entities = [
  BillsDetailEntity,
  BillsTransactionEntity,
  DeliveryDetailEntity,
  DeliveryTransactionEntity,
  ItemGroupMasterEntity,
  ItemMasterEntity,
  ItemUnitMasterEntity,
  PartyMasterEntity,
  SettingsMasterEntity,
  TaxMasterEntity,
]
const migrations = []
const subscribers = []

export default {
  "type": "sqlite",
  'folder': DB_FILES_FOLDER,
  "synchronize": true,
  "logging": false,
  "entities": entities,
  "migrations": migrations,
  "subscribers": subscribers,
  "cli": {
    "entitiesDir": entities,
    "migrationsDir": migrations,
    "subscribersDir": subscribers
  }
}

