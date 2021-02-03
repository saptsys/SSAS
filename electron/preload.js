require('electron-promise-ipc/preload');
// const promiseIpc = require('electron-promise-ipc');
// console.log("k")

// const { ipcRenderer, contextBridge } = require("electron");
// contextBridge.exposeInMainWorld("api",promiseIpc);

// const apiObj = {
//   send: (channel, ...data) => {
//     console.log(channel , data)
//     // allowlist channels SENDING to Main
//     const allowedChannels = [
//       "send"
//     ];
//     if (allowedChannels.includes(channel)) {
//       ipcRenderer.send(channel, ...data);
//     }
//   },
//   receive: (channel, cb) => {
//     // allowlist channels
//     const allowedChannels = [
//       "receive"
//     ];
//     if (allowedChannels.includes(channel)) {
//       ipcRenderer.on(channel, (event, ...args) => cb(...args));
//     }
//   },
//  };

// this is because we need to have context isolation to be false for spectron tests to run, but context bridge only runs if context isolation is true
// basically we are assigning certain node functionality (require, ipcRenderer) to the window object in an UN-isolated context only for testing
// security is reduced for testing, but remains sturdy otherwise
// if (process.env.NODE_ENV === "test") {
//   console.log("made it into here");
//   window.electronRequire = require;
//   window.api = apiObj;
// } else {
//   contextBridge.exposeInMainWorld("api", apiObj);

// }
