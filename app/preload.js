const promiseIpc = require('electron-promise-ipc');

window.promiseIpc = promiseIpc;
window.theProcess = process;
console.log(promiseIpc)
