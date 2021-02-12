const promiseIpc = require("electron-promise-ipc");
const { webContents } = require("electron");
/**
 *
 * @param {String} chanel
 * @param {Object} data
 * @returns {Promise}
 */
function dispatchToFocusedWindow(chanel, data) {
  try {
    return promiseIpc.send(chanel, webContents.getFocusedWebContents(), data);
  } catch (e) {
    return Promise.reject(e);
  }
}

/**
 *
 * @param {String} chanel
 * @param {Object} data
 * @returns {void}
 */
function dispatchToAllWindow(chanel, data) {
  try {
    webContents.getAllWebContents().forEach((webc) => {
      promiseIpc.send(chanel, webc, data);
    });
  } catch (e) {
    
  }
}


module.exports = {
  reverseIpc:{
    dispatchToFocusedWindow:dispatchToFocusedWindow,
    dispatchToAllWindow:dispatchToAllWindow
  }
}