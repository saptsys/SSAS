const DBFFile = require("dbffile").default;
const { PartyMaster } = require("../../dbManager/models/PartyMaster");
const { ItemMaster } = require("../../dbManager/models/ItemMaster");
const { getConnection } = require("typeorm");

class ImportFromGayatri {

  databaseFolder = "sksfas";
  partyMaster = "AC_MAS.DBF";
  itemMaster = "QUALITY.DBF";

  parties = []
  items = []
  /**
   *
   * @param {Object} gayatri
   * @param (String) gayatri.path
   * @param (String) gayatri.year
   *
   *  {
        path: "H:/SAPTSYS/Gayatri Sofware Demo/",
        year: "1819",
      }
   */
  async importParties(gayatri) {

    const databasePath = `${gayatri.path}${this.databaseFolder}/002${gayatri.year}/${this.partyMaster}`
    console.log(databasePath)
    const dbf = await DBFFile.open(databasePath)

    const totalRecords = dbf.recordCount;

    console.log(totalRecords)

    let rawData = await dbf.readRecords(100);

    for (let index = 0; index < rawData.length; index++) {
      const row = rawData[index];

      if (row['MGRPCODE'] !== "007" && /* sale party */
        row['MGRPCODE'] !== "008"    /* purchase party */

      ) {
        continue;
      }

      try {
        let party = {
          name: row['ACNAME'],
          type: row['MGRPCODE'] === "007" ? "CUSTOMER" : "SUPPLIER",
          phone: row['PHN'],
          mobile: row['PHN'],
          address: row['ADDRESS1'] + row['ADDRESS2'] + row['ADDRESS3'],
          email: row['EMAIL_ID'],
          city: row['CITY'],
          stateCode: this.getStateCode(row['GSTIN']), /*not sure about how they handling state so 24 is default*/
          isActive: !(row['DACTIVATE'] ?? false),
          gstin: row['GSTIN'],
          pan: this.getPAN(row['GSTIN'])
        }
        this.parties.push(party);
      } catch (e) {
      }
    }
    console.log(this.parties)

    return this.parties;
  }

  async importItems(gayatri) {

    const databasePath = `${gayatri.path}${this.databaseFolder}/002${gayatri.year}/${this.itemMaster}`
    console.log(databasePath)
    const dbf = await DBFFile.open(databasePath)

    const totalRecords = dbf.recordCount;

    console.log(totalRecords)

    let rawData = await dbf.readRecords(100);

    for (let index = 0; index < rawData.length; index++) {
      const row = rawData[index];

      try {
        let item = {
          name: row['QUALITY'],
          code: (row['QUALITY'] ?? "").toUpperCase(),
        }
        this.items.push(item);
      } catch (e) {
      }
    }
    console.log(this.items)

    return this.items;
  }

  getPAN(gstin) {
    try {
      return gstin.substring(2, gstin.length - 3)
    } catch (e) {
      return ""
    }
  }

  getStateCode(gstin) {
    try {
      return gstin.substring(0, 2)
    } catch (e) {
      return ""
    }
  }


  getParties() {
    return this.parties;
  }

  getItems() {
    return this.items;
  }

  async feedToDatabase() {
    try {
      await getConnection().getRepository(PartyMaster).insert(this.parties)
      await getConnection().getRepository(ItemMaster).insert(this.items)
      return true
    } catch (e) {
      console.log(e)
      return false
    }
  }


  async importAndInsert(payload) {
    await this.importParties(payload)
    await this.importItems(payload)
    return this.feedToDatabase()
  }



}


module.exports = {
  ImportFromGayatri
}
