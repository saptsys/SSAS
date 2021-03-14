const { BillsDetail } = require("./BillsDetail");
const { BillsTransaction } = require("./BillsTransaction");
const { DeliveryDetail } = require("./DeliveryDetail");
const { DeliveryTransaction } = require("./DeliveryTransaction");
const { ItemGroupMaster } = require("./ItemGroupMaster");
const { ItemMaster } = require("./ItemMaster");
const { ItemUnitMaster } = require("./ItemUnitMaster");
const { PartyMaster } = require("./PartyMaster");
const { SettingsMaster } = require("./SettingsMaster");
const { TaxMaster } = require("./TaxMaster");

module.exports = {
  BillsDetail: BillsDetail,
  BillsTransaction: BillsTransaction,
  DeliveryDetail: DeliveryDetail,
  DeliveryTransaction: DeliveryTransaction,
  ItemGroupMaster: ItemGroupMaster,
  ItemMaster: ItemMaster,
  ItemUnitMaster: ItemUnitMaster,
  PartyMaster: PartyMaster,
  SettingsMaster: SettingsMaster,
  TaxMaster: TaxMaster,
};
