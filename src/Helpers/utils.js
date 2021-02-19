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

