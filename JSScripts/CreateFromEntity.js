const path = require('path')
const glob = require('glob')

const rootDir = path.resolve(__dirname, '../')

const ormconfig = require(path.join(rootDir, 'ormconfig.js'))

const dbFolderDir = path.join(rootDir, ormconfig.folder)


glob(path.join(dbFolderDir, 'entities/*.js'), (er, files) => {
    console.log(files)
})