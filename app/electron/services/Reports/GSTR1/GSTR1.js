const commonModels = require("../commonModels/index")
const models = require("./Models/index")

// TODO : we need to create function that returns current user's home state
const HOME_STATE = 24

class GSTR1 {

  constructor(bills = []) {
    this.bills = bills
  }

  getReport() {
    let sheets = {}

    sheets.summary = this.getSummary();
    sheets.b2b = this.getB2B()
    sheets.b2cs = this.getB2CS()
    sheets.b2cl = this.getB2CL()
    sheets.cdnr = this.getCDNR()
    sheets.hsn = this.getHSN()
    sheets.cdnur = this.getCDNUR()
    return sheets;

  }



  getHSN(){
    let rows = []

    return rows
  }

  /**
   Credit/ Debit Notes/Refund vouchers issued to the unregistered persons against interstate invoice value is  more than Rs 2.5 lakh
   */
  getCDNUR(){
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
      let taxAmounts  = new commonModels.TaxAmounts();

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
