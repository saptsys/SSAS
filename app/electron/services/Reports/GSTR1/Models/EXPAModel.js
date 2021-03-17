class EXPAModel {
  constructor() {
    this.exportType = ""
    this.originalInvoiceNumber = ""
    this.originalInvoiceDate = ""
    this.revisedInvoiceNumber = ""
    this.revisedInvoiceDate = ""
    this.invoiceValue = ""
    this.portCode = ""
    this.shippingBillNumber = ""
    this.ShippingBillDate = ""
    this.rate = ""
    this.taxableValue = ""
    this.cessAmount = ""
  }
}

module.exports = {
  EXPAModel: EXPAModel
}
