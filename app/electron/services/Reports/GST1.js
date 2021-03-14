const commonModels = require("./commonModels/index")
class GST1 {

  constructor(bills = []) {
    this.bills = bills
  }

  getReport(){
    let rows = []
    for(let billIndex in this.bills){
      const invoice = this.bills[billIndex]

      rows.push(...this.parseInvoice(invoice))
    }

    return rows;
  }


  parseInvoice(invoice){
    let parsed = []

    // TODO : NTD (Need To Discuss)
    // we have to understand how to handle multi tax invoice
    if(invoice.SGSTPercentage){
      parsed.push(this.parseInvoiceTaxWise(invoice , invoice.SGSTPercentage))
    }

    return parsed
  }

  parseInvoiceTaxWise(invoice , tax){
    let row = new GST1Model();
    let amount = new commonModels.Amount();
    let invoiceDetails = new commonModels.InvoiceDetails();

    row.gstin = invoice.partyMasterId.gstin

    invoiceDetails.no = invoice.billNumber
    invoiceDetails.date = invoice.billDate
    invoiceDetails.value = invoice.grossAmount
    row.invoiceDetails = invoiceDetails;

    row.rate = invoice.SGSTPercentage

    // TODO : NTD
    // cess = tax on tax
    // row.cessRate = invoice.cessRate;
    row.taxableValue = invoice.netAmount

    amount.integratedTax = invoice.SGSTAmount
    // TODO : NTD
    // maybe this is tax that central gov. imposes
    // amount.centralTax = ?

    // TODO : NTD
    // amount.stateTax = ?

    // TOFO : NTD
    // amount.cess = ?

    row.amount = amount;

    // TODO : NTD
    // how we'll get state? by parties GSTIN?
    // row.placeOfSupply = ?



    return row
  }


  setBills(bills){
    this.bills = bills
  }
  getBills(){
    return this.bills
  }
}


class GST1Model {

  constructor({
    gstin,
    invoiceDetails,
    rate,
    cessRate,
    taxableValue,
    amount,
    cess,
    placeOfSupply
  } = {}) {
    this.gstin = gstin;
    this.invoiceDetails = invoiceDetails;
    this.rate = rate;
    this.cessRate = cessRate;
    this.taxableValue = taxableValue;
    this.amount = amount;
    this.cess = cess;
    this.placeOfSupply = placeOfSupply;
  }
}

module.exports = {
  GST1Model:GST1Model,
  GST1:GST1,
};
