class TaxAmounts {
  constructor({
    integratedTax = 0,
    centralTax = 0,
    stateTax = 0,
    cess = 0,
  } = {}) {
    this.integratedTax = integratedTax;
    this.centralTax = centralTax;
    this.stateTax = stateTax;
    this.cess = cess;
  }
}
module.exports = {
  TaxAmounts: TaxAmounts,
};
