var electronInstaller = require('electron-winstaller');

var settings = {
    appDirectory: './release/package/ssas-win32-ia32',
    outputDirectory: './release/',
    authors: 'saptsys',
    exe: './ssas.exe'
};

resultPromise = electronInstaller.createWindowsInstaller(settings);
 
resultPromise.then(() => {
    console.log("The installers of your application were succesfully created !");
}, (e) => {
    console.log(`Well, sometimes you are not so lucky: ${e.message}`)
});