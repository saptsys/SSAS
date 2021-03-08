/**
 * 
 * @param {String} str
 * @returns {String} 
 */
export const stringNormalize = (str) => {
  try {
    return str.toString()
      .trim()
      .toUpperCase()
      .replace(/\s+/g, "")
      .replace(/[^\w\-]+/g, "")
      .replace(/\-\-+/g, "")
      .replace(/^-+/, "")
      .replace(/-+$/, "");
  } catch (e) {
    return str;
  }
}

/**
 * 
 * @param {String} str 
 * @param {boolean} softFail 
 */
export const stringToJson = (str , softFail = false) => {
  try {
    return JSON.parse(str)
  } catch (e) {
    if(softFail){
      return {};
    }
    return;
  }
}
/**
 * 
 * @param {String} obj 
 * @param {boolean} softFail 
 */
export const jsonToString = (obj , softFail = false) => {
  try {
    return JSON.stringify(obj)
  } catch (e) {
    if(softFail){
      return {};
    }
    return;
  }
}