var Table_0_19 = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"],
  Table_20_90 = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"],
  Table_Scale = ["", "Thousand", "Lakh", "Crore", "Arab", "Kharab", "Neel", "Padma", "Shankh", "Samudra", "Antya", "Madhyam", "Paraardh", "***", "***"];
//===================================================================
export function integerToWordsInd(Num = 0, Official = 0) {
  if (Num === 0) return "Zero";
  if (Official) return Siptlets(Num);                   // Return Official Numbering System text
  let NumWords = "";
  Num = ("0".repeat(6 * (Num += "").length % 7) + Num).match(/.{7}/g); // Create Siptlets Array
  return Num.forEach((Siptlet, ScalePos) => {               // Return Commmon-Use Numbering System text
    let [Scale, SWords] = [(Table_Scale[3] + " ").repeat(Num.length - ScalePos - 1).trimRight(), Siptlets(Siptlet)];
    NumWords += (NumWords && SWords ? ", " : "") + SWords + (Scale ? " " : "") + Scale;
  }), NumWords;
  //===================================================================
  function Siptlets(Num, NumWords = "") {                 // Core function (Called for both Systems)
    (Num += "").length - 3 & 1 && (Num = "0" + Num);
    Num = Num > 999 ? [...Num.slice(0, -3).match(/.{2}/g).map(e => "0" + e), (Num.slice(-3))] : [("00" + Num).substr(-3)];
    return Num.forEach((Duplet, ScalePos) => {
      if (+Duplet) {
        let [Hyphen, Hundreds, Tens, Scale] = [+Duplet[2] ? "-" : "", +Duplet[0], +Duplet.substr(1), Table_Scale[Num.length - ScalePos - 1]];
        NumWords += (NumWords ? " " : "") + (Hundreds ? Table_0_19[Hundreds] + " Hundred" : "") +
          (Hundreds && Tens ? " " : "") + (Tens < 20 ? Table_0_19[Tens] :
            Table_20_90[+(Duplet[1])] + Hyphen + Table_0_19[+Duplet[2]]);
        NumWords += (NumWords && Scale ? " " : "") + Scale;
      }
    }), NumWords;
  }
}
//===================================================================




//===================================================================
//      Extra Function if needed for Indian Currency
// Uses same input parameters as the above main function
//===================================================================
export function numberCurrencyIn(Num = 0, Official = 0) {
  let n = (Num + "").split(0.1.toLocaleString().substr(1, 1)); // Number and Fraction parts
  n.length !== 2 && (n[1] = ""); // No fraction
  Num = n[0];
  let Nw = "", Fw = "", Frc = (n[1] + "00").substring(0, 2); // Limit to 2 Decimal Places
  Num && (Nw = integerToWordsInd(Num, Official));       // Convert the Whole Number
  Frc && (Fw = integerToWordsInd(Frc, Official));       // Convert the Fractional Part
  return (Nw ? Nw : "") + (Nw ? " Rupees" : "") + (Nw && Fw ? " and " : "") + (Fw ? Fw + " Paisa" : ""); // Join together
}
