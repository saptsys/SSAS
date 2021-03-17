class CDNRAModel {
  constructor() {
    this.gstin = ""
    this.receiverName = ""
    this.originalNoteNumber = ""
    this.originalNoteDate = ""
    this.revisedNoteNumber = ""
    this.revisedNoteDate = ""
    this.noteType = ""
    this.placeOfSupply = ""
    this.reverseCharge = ""
    this.noteSupplyType = ""
    this.noteValue = ""
    this.applicablePercentage = ""
    this.rate = ""
    this.taxableAmount = ""
    this.cessAmount = ""
  }
}

module.exports = {
  CDNRAModel: CDNRAModel
}
