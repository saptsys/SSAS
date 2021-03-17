const commonModels = require("./../../commonModels/index")

class B2CLModel {
  constructor() {
    this.invoiceDetails = new commonModels.InvoiceDetails();
    this.placeOfSupply = 0
    this.gstinOfEcom = ""
    this.rate = 0
    this.taxableValue = 0
    this.cessAmount = 0
  }
}

module.exports = {
  B2CLModel:B2CLModel
}
