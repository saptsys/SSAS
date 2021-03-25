import { getConnection } from "typeorm";

function seed(runner) {
  runner.query(`INSERT INTO "settings_mst" ("id", "key", "type", "options", "default_value", "current_value") VALUES (1,  'THEME',  'SELECT',  '[{"label":"Dark Theme","value":"DARK"},{"label":"Light Theme","value":"Light"}]',  '{"label":"Light Theme","value":"Light"}',  '{"label":"Dark Theme","value":"DARK"}');`)
  runner.query(`INSERT INTO "settings_mst" ("id", "key", "type", "options", "default_value", "current_value") VALUES (2,  'INVOICE_PRINT',  'SELECT',  '[{"label":"Standard","value":"STANDARD"},{"label":"Minimal","value":"MINIMNAL"}]',  '{"label": "Standard", "value": "STANDARD"}',  '{"label":"Standard","value":"STANDARD"}');`)
  runner.query(`INSERT INTO "settings_mst" ("id", "key", "type", "options", "default_value", "current_value") VALUES (3,  'DECIMAL_PREF',  'NUMBER',  '',  '2',  '3');`)
  runner.query(`INSERT INTO "settings_mst" ("id", "key", "type", "options", "default_value", "current_value") VALUES (4,  'PASSWORD__del_4',  'SECRET',  '',  '',  '');`)
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
