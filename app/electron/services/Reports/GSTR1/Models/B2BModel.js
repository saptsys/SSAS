const commonModels = require("./../../commonModels/index")
class B2BModel {
  constructor() {
    this.gstin = ""
    this.receiverName = ""
    this.invoiceDetails = new commonModels.InvoiceDetails();
    this.placeOfSupply = 0
    this.reverseCharge = false
    this.applicablePercentage = 100
    this.invoiceType = "R"
    this.gstinOfEcom = ""
    this.rate = 0
    this.taxableValue = 0
    this.cessAmount = 0
  }
}

module.exports = {
  B2BModel:B2BModel
}
