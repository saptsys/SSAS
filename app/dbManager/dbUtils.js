const { getConnection } = require('typeorm')

function rowToModelPropertyMapper(alias, modelClass) {
    const entitySchema = getConnection().getMetadata(modelClass)
    return entitySchema.columns.map(col => {
        return `${alias}.${col.databaseName} AS ${col.propertyName}`
    })
}
module.exports = rowToModelPropertyMapper