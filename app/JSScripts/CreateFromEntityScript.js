import { resolve, join } from 'path';
import glob from 'glob';
import { existsSync, writeFile } from 'fs';

const rootDir = resolve(__dirname, '../')

const ormconfig = require(join(rootDir, 'ormconfig.js'))

const dbFolderDir = join(rootDir, ormconfig.folder)


glob(join(dbFolderDir, 'entities/*.js'), (er, files) => {
    files.forEach(file => {
        if (!file.includes("__BaseEntity")) {
            const entitySchema = require(file)
            const modelPath = join(dbFolderDir, `models/${entitySchema.options.name}.js`)
            if (existsSync(modelPath)) {
                console.log(`====> MODEL '${entitySchema.options.name}' ALREADY EXIST <====\n`)
                return;
            }
            let params = Object.keys(entitySchema.options.columns).join(',\n\t\t')
            let assignment = Object.keys(entitySchema.options.columns).map(x => `this.${x} = ${x};`).join('\n\t\t')

            const dataToWrite = `
const _BaseModel = require("./_BaseModel");

class ${entitySchema.options.name} extends _BaseModel {
    constructor({
        ${params},
        ...rest
    } = {}
    ) {
        super(rest),
        ${assignment}
    }
}
module.exports = ${entitySchema.options.name}`;
            writeFile(modelPath, dataToWrite, (err) => err ? console.error(err) : console.log(`\n\n====> MODEL '${entitySchema.options.name}' CREATED <====\n${modelPath}`))
        }
    })
})
