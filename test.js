const DBFFile = require("dbffile").default;

const gayatri = {
  path: "H:\\SAPTSYS\\Gayatri Sofware Demo\\",
  year: "1819",
  imports: ["salesParties", "purchaseParties", "items"]
}

const databaseFolder = "sksfas"

async function main() {

  const partyMaster = "AC_MAS.DBF";

  const databasePath = `${gayatri.path}${databaseFolder}/002${gayatri.year}/${partyMaster}`
  console.log(databasePath)
  const dbf = await DBFFile.open(databasePath)

  const totalRecords = dbf.recordCount;

  console.log(totalRecords)

  let parties = [];


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
        stateCode: getStateCode(row['GSTIN']), /*not sure about how they handling state so 24 is default*/
        isActive: !(row['DACTIVATE'] ?? false),
        gstin: row['GSTIN'],
        pan: getPAN(row['GSTIN'])
      }
      parties.push(party);
    } catch (e) {
    }
  }
  console.log(parties)

  return parties;
}

function getPAN(gstin) {
  try {
    return gstin.substring(2, gstin.length - 3)
  } catch (e) {
    return ""
  }
}

function getStateCode(gstin) {
  try {
    return gstin.substring(0, 2)
  } catch (e) {
    return ""
  }
}

main()
