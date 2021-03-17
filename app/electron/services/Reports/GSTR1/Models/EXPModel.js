class EXPModel {
  constructor() {
    this.exportType = ""
    this.invoiceNumber = ""
    this.invoiceValue = ""
    this.invoiceDate = ""
    this.portCode = ""
    this.shippingBillNumber = ""
    this.ShippingBillDate = ""
    this.rate = ""
    this.taxableValue = ""
    this.cessAmount = ""
  }
}

module.exports = {
  EXPModel: EXPModel
}
