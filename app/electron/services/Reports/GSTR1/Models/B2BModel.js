const commonModels = require("./../../commonModels/index")
class B2BModel {
  constructor() {
    this.gstin = ""
    this.invoiceDetails = new commonModels.InvoiceDetails();
    this.placeOfSupply = 0
    this.reverseCharge = false
    this.applicablePercentage = 100
    this.invoiceType = "R"
    this.gstOfEcom = ""
    this.serialNumber = ""
    this.rate = 0
    this.taxableValue = 0
    this.taxAmounts = new commonModels.TaxAmounts();
  }
}

module.exports = {
  B2BModel:B2BModel
}
