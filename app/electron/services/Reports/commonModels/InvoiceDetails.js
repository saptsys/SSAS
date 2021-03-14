class InvoiceDetails {
  constructor({
    no,
    date,
    value,
  } = {}) {
    this.no = no;
    this.date = date;
    this.value = value;
  }
}
module.exports = {
  InvoiceDetails: InvoiceDetails,
};
