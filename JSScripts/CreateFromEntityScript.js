const path = require('path')
const glob = require('glob')
const fs = require('fs');

const rootDir = path.resolve(__dirname, '../')

const ormconfig = require(path.join(rootDir, 'ormconfig.js'))

const dbFolderDir = path.join(rootDir, ormconfig.folder)


glob(path.join(dbFolderDir, 'entities/*.js'), (er, files) => {
    files.forEach(file => {
        if (!file.includes("__BaseEntity")) {
            const entitySchema = require(file)
            const modelPath = path.join(dbFolderDir, `models/${entitySchema.options.name}.js`)
            if (fs.existsSync(modelPath)) {
                console.log(`====> MODEL '${entitySchema.options.name}' ALREADY EXIST <====\n`)
                return;
            }
            let params = Object.keys(entitySchema.options.columns).join(',\n\t\t')
            let assignment = Object.keys(entitySchema.options.columns).map(x => `this.${x} = ${x};`).join('\n\t\t')

            const dataToWrite = `
class ${entitySchema.options.name} {
    constructor({
        ${params}
    } = {}
    ) {
        ${assignment}
    }
}
module.exports = ${entitySchema.options.name}`;
            fs.writeFile(modelPath, dataToWrite, (err) => err ? console.error(err) : console.log(`\n\n====> MODEL '${entitySchema.options.name}' CREATED <====\n${modelPath}`))
        }
    })
})