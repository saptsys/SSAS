import { getConnection } from "typeorm";

function seed(runner) {
  runner.query(`INSERT INTO "settings_mst" ("id", "key", "type", "options", "default_value", "current_value") VALUES (1,  'THEME',  'SELECT',  '[{"label":"Dark Theme","value":"DARK"},{"label":"Light Theme","value":"Light"}]',  '{"label":"Light Theme","value":"Light"}',  '{"label":"Dark Theme","value":"DARK"}');`)
  runner.query(`INSERT INTO "settings_mst" ("id", "key", "type", "options", "default_value", "current_value") VALUES (2,  'INVOICE_PRINT',  'SELECT',  '[{"label":"Standard","value":"STANDARD"},{"label":"Minimal","value":"MINIMNAL"}]',  '{"label": "Standard", "value": "STANDARD"}',  '{"label":"Standard","value":"STANDARD"}');`)
  runner.query(`INSERT INTO "settings_mst" ("id", "key", "type", "options", "default_value", "current_value") VALUES (3,  'DECIMAL_PREF',  'NUMBER',  '',  '2',  '3');`)
  runner.query(`INSERT INTO "settings_mst" ("id", "key", "type", "options", "default_value", "current_value") VALUES (4,  'PASSWORD',  'SECRET',  '',  '',  '');`)
  runner.query(`INSERT INTO "settings_mst" ("id", "key", "type", "options", "default_value", "current_value") VALUES (5,  'BACKUP_LOCATION',  "STRING",  '',  NULL,  NULL);`)
  runner.query(`INSERT INTO tax_mst(name,code,tax_percentage,is_active) VALUES ("GST 12%","GST12",12,true)`)
  runner.query(`INSERT INTO "item_unit_mst" ("name", "code") VALUES ('BAGS','BAG')`);
  runner.query(`INSERT INTO "item_unit_mst" ("name", "code") VALUES ('BALE','BAL')`);
  runner.query(`INSERT INTO "item_unit_mst" ("name", "code") VALUES ('BUNDLES','BDL')`);
  runner.query(`INSERT INTO "item_unit_mst" ("name", "code") VALUES ('BUCKLES','BKL')`);
  runner.query(`INSERT INTO "item_unit_mst" ("name", "code") VALUES ('BILLION OF UNITS','BOU')`);
  runner.query(`INSERT INTO "item_unit_mst" ("name", "code") VALUES ('BOX','BOX')`);
  runner.query(`INSERT INTO "item_unit_mst" ("name", "code") VALUES ('BOTTLES','BTL')`);
  runner.query(`INSERT INTO "item_unit_mst" ("name", "code") VALUES ('BUNCHES','BUN')`);
  runner.query(`INSERT INTO "item_unit_mst" ("name", "code") VALUES ('CANS','CAN')`);
  runner.query(`INSERT INTO "item_unit_mst" ("name", "code") VALUES ('CUBIC METERS','CBM')`);
  runner.query(`INSERT INTO "item_unit_mst" ("name", "code") VALUES ('CUBIC CENTIMETERS','CCM')`);
  runner.query(`INSERT INTO "item_unit_mst" ("name", "code") VALUES ('CENTIMETERS','CMS')`);
  runner.query(`INSERT INTO "item_unit_mst" ("name", "code") VALUES ('CARTONS','CTN')`);
  runner.query(`INSERT INTO "item_unit_mst" ("name", "code") VALUES ('DOZENS','DOZ')`);
  runner.query(`INSERT INTO "item_unit_mst" ("name", "code") VALUES ('DRUMS','DRM')`);
  runner.query(`INSERT INTO "item_unit_mst" ("name", "code") VALUES ('GREAT GROSS','GGK')`);
  runner.query(`INSERT INTO "item_unit_mst" ("name", "code") VALUES ('GRAMMES','GMS')`);
  runner.query(`INSERT INTO "item_unit_mst" ("name", "code") VALUES ('GROSS','GRS')`);
  runner.query(`INSERT INTO "item_unit_mst" ("name", "code") VALUES ('GROSS YARDS','GYD')`);
  runner.query(`INSERT INTO "item_unit_mst" ("name", "code") VALUES ('KILOGRAMS','KGS')`);
  runner.query(`INSERT INTO "item_unit_mst" ("name", "code") VALUES ('KILOLITRE','KLR')`);
  runner.query(`INSERT INTO "item_unit_mst" ("name", "code") VALUES ('KILOMETRE','KME')`);
  runner.query(`INSERT INTO "item_unit_mst" ("name", "code") VALUES ('MILILITRE','MLT')`);
  runner.query(`INSERT INTO "item_unit_mst" ("name", "code") VALUES ('METERS','MTR')`);
  runner.query(`INSERT INTO "item_unit_mst" ("name", "code") VALUES ('METRIC TON','MTS')`);
  runner.query(`INSERT INTO "item_unit_mst" ("name", "code") VALUES ('NUMBERS','NOS')`);
  runner.query(`INSERT INTO "item_unit_mst" ("name", "code") VALUES ('PACKS','PAC')`);
  runner.query(`INSERT INTO "item_unit_mst" ("name", "code") VALUES ('PIECES','PCS')`);
  runner.query(`INSERT INTO "item_unit_mst" ("name", "code") VALUES ('PAIRS','PRS')`);
  runner.query(`INSERT INTO "item_unit_mst" ("name", "code") VALUES ('QUINTAL','QTL')`);
  runner.query(`INSERT INTO "item_unit_mst" ("name", "code") VALUES ('ROLLS','ROL')`);
  runner.query(`INSERT INTO "item_unit_mst" ("name", "code") VALUES ('SETS','SET')`);
  runner.query(`INSERT INTO "item_unit_mst" ("name", "code") VALUES ('SQUARE FEET','SQF')`);
  runner.query(`INSERT INTO "item_unit_mst" ("name", "code") VALUES ('SQUARE METERS','SQM')`);
  runner.query(`INSERT INTO "item_unit_mst" ("name", "code") VALUES ('SQUARE YARDS','SQY')`);
  runner.query(`INSERT INTO "item_unit_mst" ("name", "code") VALUES ('TABLETS','TBS')`);
  runner.query(`INSERT INTO "item_unit_mst" ("name", "code") VALUES ('TEN GROSS','TGM')`);
  runner.query(`INSERT INTO "item_unit_mst" ("name", "code") VALUES ('THOUSANDS','THD')`);
  runner.query(`INSERT INTO "item_unit_mst" ("name", "code") VALUES ('TONNES','TON')`);
  runner.query(`INSERT INTO "item_unit_mst" ("name", "code") VALUES ('TUBES','TUB')`);
  runner.query(`INSERT INTO "item_unit_mst" ("name", "code") VALUES ('US GALLONS','UGS')`);
  runner.query(`INSERT INTO "item_unit_mst" ("name", "code") VALUES ('UNITS','UNT')`);
  runner.query(`INSERT INTO "item_unit_mst" ("name", "code") VALUES ('YARDS','YDS')`);
  runner.query(`INSERT INTO "item_unit_mst" ("name", "code") VALUES ('OTHERS','OTH')`);
}

async function initDB() {
  const runner = getConnection().createQueryRunner()

  try {
    seed(runner)
    return true
  } catch (e) {
    console.log(e)
  }
  return false
}

export default initDB
