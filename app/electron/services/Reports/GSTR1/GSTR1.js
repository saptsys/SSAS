const commonModels = require("../commonModels/index")
const models = require("./Models/index")
const ObjectToCSV = require("objects-to-csv")
const ExcelJS = require('exceljs');
const { Readable } = require("stream")
const SettingsMasterService = require("./../../SettingsMasterService");
const {app,dialog} = require("electron");
const path = require('path')

// TODO : we need to create function that returns current user's home state
const HOME_STATE = 24

class GSTR1 {

  constructor(bills = []) {
    this.bills = bills
  }

  async askForLocation(){
    let location = await dialog.showOpenDialog({properties: ['openDirectory']});

    console.log(location)

    if(location.canceled){
      return null;
    }
    location = location.filePaths[0];
    return location;
  }

  async getReport() {
    let sheets = {}

    sheets.summary = this.getSummary();
    sheets.b2b = this.getB2B()
    sheets.b2cs = this.getB2CS()
    sheets.b2cl = this.getB2CL()
    sheets.cdnr = this.getCDNR()
    sheets.hsn = this.getHSN()
    sheets.cdnur = this.getCDNUR()
    const workbook = new ExcelJS.Workbook();

    const csv = {};
    // csv['summary'] = this.toCSV(sheets.summary, "SUMMARY");
    csv['b2b'] = this.toCSV(sheets.b2b, "B2B");
    csv['b2cs'] = this.toCSV(sheets.b2cs, "B2CS");
    csv['b2cl'] = this.toCSV(sheets.b2cl, "B2CL");
    csv['cdnr'] = this.toCSV(sheets.cdnr, "CDNR");
    csv['hsn'] = this.toCSV(sheets.hsn, "HSN");
    csv['cdnur'] = this.toCSV(sheets.cdnur, "CDNUR");

    for (let [key, value] of Object.entries(csv)) {
      var worksheet = await workbook.csv.read(Readable.from([value]));
      worksheet.name = key;
    }
    const setting = new SettingsMasterService();
    // let location = await setting.getSettingValue("REPORT_LOCATION" , app.getPath("desktop"))

    let location = await this.askForLocation();
    if(location === null){
      return;
    }
    location = `${location}/GSTR1 (${new Date().toLocaleDateString().split("/").join("-")}).xlsx`
    await workbook.xlsx.writeFile(location);

    return sheets;

  }

  /**
   *
   * @param {Array} arr
   * @param {String} type
   */
  toCSV(arr, type) {

    let data = [];

    switch (type) {
      case "SUMMARY":
        if(arr.length == 0){
          arr[0] = {}
        }
        arr.forEach(obj => {
          let newObj = {}
          newObj['GSTIN/UIN of Recipient'] = obj.gstin
          newObj['Invoice Number'] = obj?.invoiceDetails?.no
          newObj['Invoice Date'] = obj?.invoiceDetails?.date
          newObj['Invoice Value'] = obj?.invoiceDetails?.value
          newObj['Rate'] = obj.rate
          newObj['Cess Rate'] = obj.cessRate
          newObj['Taxable Value'] = obj.taxableValue
          newObj['Place Of Supply'] = obj.placeOfSupply
          newObj["Integrated Tax"] = obj?.taxAmounts?.integratedTax
          newObj["Central Tax"] = obj?.taxAmounts?.centralTax
          newObj["State Tax"] = obj?.taxAmounts?.stateTax
          newObj["Cess Amount"] = obj?.taxAmounts?.cess

          data.push(newObj);
        });
        break;
      case "B2B":
        if(arr.length == 0){
          arr[0] = {}
        }
        arr.forEach(obj => {
          let newObj = {}

          newObj['GSTIN/UIN of Recipient'] = obj.gstin
          newObj['Receiver Name'] = obj.receiverName
          newObj['Invoice Number'] = obj?.invoiceDetails?.no
          newObj['Invoice Date'] = obj?.invoiceDetails?.date
          newObj['Invoice Value'] = obj?.invoiceDetails?.value
          newObj['Place Of Supply'] = obj.placeOfSupply
          newObj['Reverse Charge'] = obj.reverseCharge
          newObj['Applicable Percentage'] = obj.applicablePercentage
          newObj['Invoice Type'] = obj.invoiceType
          newObj['E-Commerce GSTIN'] = obj.gstinOfEcom
          newObj['Rate'] = obj.rate
          newObj['Taxable Value'] = obj.taxableValue
          newObj["Cess Amount"] = obj.cessAmount

          data.push(newObj);
        });
        break;
      case "B2CS":
        if(arr.length == 0){
          arr[0] = {}
        }
        arr.forEach(obj => {
          let newObj = {}
          // Type	Place Of Supply	Rate	Taxable Value	Cess Amount	E-Commerce GSTIN

          newObj['Type'] = obj.type
          newObj['Place Of Supply'] = obj.placeOfSupply
          newObj['Taxable Value'] = obj.taxableValue
          newObj['Cess Amount'] = obj.cessAmount
          newObj['E-Commerce GSTIN'] = obj.gstinOfEcom
          newObj['Applicable Percentage'] = obj.applicablePercentage
          data.push(newObj);

        });
        break;
      case "B2CL":
        if(arr.length == 0){
          arr[0] = {}
        }
        arr.forEach(obj => {
          let newObj = {}
          // Invoice Number	Invoice date	Invoice Value	Place Of Supply	Rate	Taxable Value	Cess Amount	E-Commerce GSTIN
          newObj['Invoice Number'] = obj?.invoiceDetails?.no
          newObj['Invoice Date'] = obj?.invoiceDetails?.date
          newObj['Invoice Value'] = obj?.invoiceDetails?.value
          newObj['Place Of Supply'] = obj.placeOfSupply
          newObj['E-Commerce GSTIN'] = obj.gstinOfEcom
          newObj['Rate'] = obj.rate
          newObj['Taxable Value'] = obj.taxableValue
          newObj["Cess Amount"] = obj.cessAmount
          data.push(newObj);

        });
        break;
      case "CDNR":
        if(arr.length == 0){
          arr[0] = {}
        }
        arr.forEach(obj => {
          let newObj = {}
          // GSTIN/UIN of Recipient	Receiver Name	Note Number	Note Date	Note Type
          // Place Of Supply	Reverse Charge	Note Supply Type	Note Value	Applicable % of Tax Rate	Rate	Taxable Value	Cess Amount
          newObj['GSTIN/UIN of Recipient'] = obj.gstin
          newObj['Receiver Name'] = obj.receiverName
          newObj['Note Number'] = obj.noteNumber
          newObj['Note Date'] = obj.noteDate
          newObj['Note Type'] = obj.noteType
          newObj['Place Of Supply'] = obj.placeOfSupply
          newObj['Reverse Charge'] = obj.reverseCharge
          newObj['Note Supply Type'] = obj.noteSupplyType
          newObj['Note Value'] = obj.noteValue
          newObj['Applicable % of Tax Rate'] = obj.applicablePercentage
          newObj['Rate'] = obj.rate
          newObj['Taxable Value'] = obj.taxableAmount
          newObj['Cess Amount'] = obj.cessAmount

          data.push(newObj);
        });
        break;
      case "HSN":
        if(arr.length == 0){
          arr[0] = {}
        }
        arr.forEach(obj => {
          let newObj = {}
          /*
          HSN
          Description
          UQC
          Total Quantity
          Total Value
          Taxable Value
          Integrated Tax Amount
          Central Tax Amount
          State/UT Tax Amount
          Cess Amount
          */
          newObj['hsn'] = obj.hsn
          newObj['Description'] = obj.description
          newObj['UQC'] = obj.uqc
          newObj['Total Quantity'] = obj.totalQuantity
          newObj['Total Value'] = obj.totalValue
          newObj['Taxable Value'] = obj.taxableValue
          newObj['Integrated Tax Amount'] = obj.integratedTaxValue
          newObj['Central Tax Amount'] = obj.centralTaxAmount
          newObj['State/UT Tax Amount'] = obj.stateTaxAmount
          newObj['Cess Amount'] = obj.cessAmount

          data.push(newObj);
        });
        break;
      case "CDNUR":
        if(arr.length == 0){
          arr[0] = {}
        }
        arr.forEach(obj => {
          let newObj = {}
          /*
          UR Type
          Note Number
          Note Date
          Note Type
          Place Of Supply
          Note Value
          Applicable % of Tax Rate
          Rate
          Taxable Value
          Cess Amount
          */
         newObj['UR Type'] = obj.urType
         newObj['Note Number'] = obj.noteNumber
         newObj['Note Date'] = obj.noteDate
         newObj['Note Type'] = obj.noteType
         newObj['Place Of Supply'] = obj.placeOfSupply
         newObj['Note Value'] = obj.taxableValue
         newObj['Applicable % of Tax Rate'] = obj.applicablePercentages
         newObj['Rate'] = obj.rate
         newObj['Taxable Value'] = obj.taxableAmount
         newObj['Cess Amount'] = obj.cessAmount
        data.push(newObj);
        });
        break;
      default:
        break;
    }


    const csv = new ObjectToCSV(data);
    // csv.toDisk("./text.csv");

    return csv.toString();
  }

  getHSN() {
    let rows = []

    return rows
  }

  /**
   Credit/ Debit Notes/Refund vouchers issued to the unregistered persons against interstate invoice value is  more than Rs 2.5 lakh
   */
  getCDNUR() {
    let rows = []
    const bills = this.bills.filter(x => {
      if (x.billing === "RETAIL" && x.tag === "SR") {
        return true
      }
      return false
    })
    for (let billIndex in bills) {
      const bill = bills[billIndex]
      let row = new models.CDNURModel();

      //  Availabel options : B2CL, EXPWP, EXPWOP
      row.urType = "B2CL"

      row.noteNumber = bill.billNumber
      row.noteDate = bill.billDate
      // C means credit note. credit note is issues when customer returns goods/services.
      // as this is GSTR1 report thus only sales related items will come
      row.noteType = "C"
      row.placeOfSupply = bill.partyMasterId.stateCode
      row.noteValue = bill.grossAmount
      row.taxableAmount = bill.taxableAmount
      row.cessAmount = 0
      row.rate = bill.IGSTPercentage
      rows.push(row)
    }
    return rows
  }

  /**
   * Credit/ Debit Notes/Refund vouchers issued to the registered taxpayers during the tax period.
   * Debit or credit note issued against invoice will be reported here against original invoice,
   * hence fill the details of original invoice also which was furnished in
   * B2B,B2CL section of earlier/current period tax period.
   *
   * basically for us cdnr is sales return where billing type is "TAX"
   */
  getCDNR() {
    let rows = []
    const bills = this.bills.filter(x => {
      if (x.billing === "TAX" && x.tag === "SR") {
        return true
      }
      return false
    })
    for (let billIndex in bills) {
      const bill = bills[billIndex]
      let row = new models.CDNRModel();
      row.receiverName = bill.partyMasterId.name
      row.gstin = bill.partyMasterId.gstin
      row.noteNumber = bill.billNumber
      row.noteDate = bill.billDate
      // C means credit note. credit note is issues when customer returns goods/services.
      // as this is GSTR1 report thus only sales related items will come
      row.noteType = "C"
      row.placeOfSupply = bill.partyMasterId.stateCode
      row.reverseCharge = "N"
      row.noteSupplyType = "REGULAR"
      row.noteValue = bill.grossAmount
      row.rate = bill.IGSTPercentage
      row.taxableAmount = bill.taxableAmount
      row.cessAmount = 0

      rows.push(row)

    }
    return rows
  }

  /**
  * Invoices for Taxable outward supplies to consumers where
  *     a)The place of supply is outside the state where the supplier is registered and
  *     b)The total invoice value is more that Rs 2,50,000
  */
  getB2CL() {
    let rows = []
    const bills = this.bills.filter(x => {
      if (x.billing == "RETAIL" && x.tag === "S") {
        if (x.partyMasterId.stateCode != HOME_STATE && x.grossAmount > 250000) {
          return true
        }
      }
      return false
    })

    for (let billIndex in bills) {
      const bill = bills[billIndex]
      let row = new models.B2CLModel();
      let invoiceDetails = new commonModels.InvoiceDetails();

      invoiceDetails.no = bill.billNumber
      invoiceDetails.date = bill.billDate
      invoiceDetails.value = bill.grossAmount

      row.invoiceDetails = invoiceDetails
      row.placeOfSupply = bill.partyMasterId.stateCode
      row.gstinOfEcom = ""
      row.rate = bill.IGSTPercentage
      row.taxableValue = bill.taxableAmount
      row.cessAmount = 0

      rows.push(row)
    }

    return rows;
  }

  /**
  *  Supplies made to consumers and unregistered persons of the following nature
  *     a) Intra-State: any value
  *     b) Inter-State: Invoice value Rs 2.5 lakh or less
  */
  getB2CS() {
    let rows = []
    const bills = this.bills.filter(x => {
      if (x.billing === "RETAIL" && x.tag === "S") {
        if (x.partyMasterId.stateCode == HOME_STATE) {
          return true
        }
        if (x.grossAmount <= 250000) {
          return true
        }
      }
      return false
    })

    for (let billIndex in bills) {
      const bill = bills[billIndex]
      let row = new models.B2CSModel();

      row.type = "OE"
      row.placeOfSupply = bill.partyMasterId.stateCode
      row.gstinOfEcom = ""
      row.rate = bill.IGSTPercentage
      row.taxableValue = bill.taxableAmount
      row.cessAmount = 0


      rows.push(row)
    }

    return rows;
  }

  /**
   * Details of invoices of Taxable supplies made to other registered taxpayers
   */
  getB2B() {
    let rows = []
    const bills = this.bills.filter(x => {
      if (x.billing === "TAX" && x.tag === "S") {
        return true
      }
      return false
    })

    for (let billIndex in bills) {
      const bill = bills[billIndex]
      let row = new models.B2BModel();
      let invoiceDetails = new commonModels.InvoiceDetails();

      invoiceDetails.no = bill.billNumber
      invoiceDetails.date = bill.billDate
      invoiceDetails.value = bill.grossAmount

      row.receiverName = bill.partyMasterId.name
      row.gstin = bill.partyMasterId.gstin
      row.invoiceDetails = invoiceDetails
      row.placeOfSupply = bill.partyMasterId.stateCode
      row.reverseCharge = "n"
      row.applicablePercentage = 100
      row.invoiceType = "R"
      row.gstinOfEcom = ""
      row.rate = bill.IGSTPercentage
      row.taxableValue = bill.taxableAmount
      row.cessAmount = 0


      rows.push(row)
    }

    return rows;
  }

  getSummary() {
    let rows = []
    for (let billIndex in this.bills) {
      const bill = this.bills[billIndex]

      let row = new GSTR1SummaryModel();
      let invoiceDetails = new commonModels.InvoiceDetails();
      let taxAmounts = new commonModels.TaxAmounts();

      row.gstin = bill.partyMasterId.gstin
      invoiceDetails.no = bill.billNumber
      invoiceDetails.date = bill.billDate
      invoiceDetails.value = bill.grossAmount
      row.invoiceDetails = invoiceDetails;
      row.rate = bill.IGSTPercentage

      row.taxableValue = bill.taxableAmount
      taxAmounts.integratedTax = bill.IGSTAmount ?? 0
      taxAmounts.centralTax = bill.CGSTAmount ?? 0
      taxAmounts.stateTax = bill.SGSTAmount ?? 0

      row.taxAmounts = taxAmounts;

      row.placeOfSupply = bill.partyMasterId.stateCode
      rows.push(row)
    }
    return rows;
  }

  setBills(bills) {
    this.bills = bills
  }
  getBills() {
    return this.bills
  }
}


class GSTR1SummaryModel {

  constructor({
    gstin,
    invoiceDetails,
    rate,
    cessRate,
    taxableValue,
    taxAmounts,
    cess,
    placeOfSupply
  } = {}) {
    this.gstin = gstin;
    this.invoiceDetails = invoiceDetails;
    this.rate = rate;
    this.cessRate = cessRate;
    this.taxableValue = taxableValue;
    this.taxAmounts = taxAmounts;
    this.cess = cess;
    this.placeOfSupply = placeOfSupply;
  }
}

module.exports = {
  GSTR1SummaryModel: GSTR1SummaryModel,
  GSTR1: GSTR1,
};
