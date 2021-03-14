const commonModels = require("../commonModels/index")
const models = require("./Models/index")


class GSTR1 {

  constructor(bills = []) {
    this.bills = bills
  }

  getReport() {
    let sheets = {}


    sheets.summery = this.getSummary();
    sheets.b2b = this.getB2B()

    return sheets;

  }

  getB2B() {
    let rows = []
    const b2bBills = this.bills.filter(x => {
      return x.partyMasterId.gstin
    })

    for (let billIndex in b2bBills) {
      const bill = this.bills[billIndex]
      let row = new models.B2BModel();
      let taxAmounts = new commonModels.TaxAmounts();
      let invoiceDetails = new commonModels.InvoiceDetails();

      invoiceDetails.no = bill.billNumber
      invoiceDetails.date = bill.billDate
      invoiceDetails.value = bill.grossAmount

      taxAmounts.integratedTax = bill.IGSTAmount ?? 0
      taxAmounts.centralTax = bill.CGSTAmount ?? 0
      taxAmounts.stateTax = bill.SGSTAmount ?? 0
      taxAmounts.cess = 0

      row.gstin = bill.partyMasterId.gstin
      row.invoiceDetails = invoiceDetails;
      row.placeOfSupply = 0
      row.reverseCharge = false
      row.applicablePercentage = 100
      row.invoiceType = "R"
      row.gstOfEcom = ""
      row.serialNumber = ""
      row.rate = bill.IGSTPercentage
      row.taxableValue = bill.netAmount
      row.taxAmounts = taxAmounts


      rows.push(row)
    }

    return rows;
  }

  getSummary() {
    let rows = []
    for (let billIndex in this.bills) {
      const bill = this.bills[billIndex]

      let row = new GSTR1SummaryModel();
      let taxAmounts = new commonModels.TaxAmounts()
      let invoiceDetails = new commonModels.InvoiceDetails();

      row.gstin = bill.partyMasterId.gstin
      invoiceDetails.no = bill.billNumber
      invoiceDetails.date = bill.billDate
      invoiceDetails.value = bill.grossAmount
      row.invoiceDetails = invoiceDetails;
      row.rate = bill.IGSTPercentage

      // TODO : NTD
      row.cessRate = bill.cessRate;
      row.taxableValue = bill.netAmount
      taxAmounts.integratedTax = bill.IGSTAmount ?? 0
      taxAmounts.centralTax = bill.CGSTAmount ?? 0
      taxAmounts.stateTax = bill.SGSTAmount ?? 0

      // TODO : NTD
      taxAmounts.cess = 0
      row.taxAmounts = taxAmounts;

      // TODO : NTD
      row.placeOfSupply = ""
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
