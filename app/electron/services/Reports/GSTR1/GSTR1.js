const commonModels = require("../commonModels/index")
const models = require("./Models/index")

// TODO : we need to create function that returns current users home state
const HOME_STATE = "GJ"

class GSTR1 {

  constructor(bills = []) {
    this.bills = bills
  }

  getReport() {
    let sheets = {}

    sheets.summery = this.getSummary();
    sheets.b2b = this.getB2B()
    sheets.b2cs = this.getB2CS();
    sheets.cdnr = this.getCDNR();

    return sheets;

  }

  /**
   * Credit/ Debit Notes/Refund vouchers issued to the registered taxpayers during the tax period.
   * Debit or credit note issued against invoice will be reported here against original invoice,
   * hence fill the details of original invoice also which was furnished in
   * B2B,B2CL section of earlier/current period tax period.
   *
   * basically for us cdnr is sales return where billing type is "GST"
   */
  getCDNR(){
    let rows = []
    const bills = this.bills.filter(x => {
      if(x.billing === "GST" && x.billing.tag === "SR"){
        return true
      }
      return false
    })
    for (let billIndex in bills) {
      const bill = bills[billIndex]
      let row = new models.B2CLModel();

    }
    return rows
  }

  /**
  * Invoices for Taxable outward supplies to consumers where
  *     a)The place of supply is outside the state where the supplier is registered and
  *     b)The total invoice value is more that Rs 2,50,000
  */
 getB2CL(){
  let rows = []
  const bills = this.bills.filter(x => {
    if(x.billing == "RETAIL" && x.billing.tag === "S"){
      if(x.partyMasterId.stateCode != HOME_STATE && x.grossAmount > 250000){
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
    row.placeOfSupply = x.partyMasterId.stateCode
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
  getB2CS(){
    let rows = []
    const bills = this.bills.filter(x => {
      if(x.billing === "RETAIL" && x.billing.tag === "S"){
        if(x.partyMasterId.stateCode == HOME_STATE){
          return true
        }
        if(x.grossAmount <= 250000){
          return true
        }
      }
      return false
    })

    for (let billIndex in bills) {
      const bill = bills[billIndex]
      let row = new models.B2CSModel();

      row.type = "OE"
      row.placeOfSupply = x.partyMasterId.stateCode
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
      if(x.billing === "GST" && x.billing.tag === "S"){
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
      row.placeOfSupply = 0
      row.reverseCharge = false
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

      row.gstin = bill.partyMasterId.gstin
      invoiceDetails.no = bill.billNumber
      invoiceDetails.date = bill.billDate
      invoiceDetails.value = bill.grossAmount
      row.invoiceDetails = invoiceDetails;
      row.rate = bill.IGSTPercentage

      // TODO : NTD
      row.cessRate = bill.cessRate;
      row.taxableValue = bill.taxableAmount
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
