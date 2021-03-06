import { getConnection } from 'typeorm'

function rowToModelPropertyMapper(alias, modelClass) {
    const entitySchema = getConnection().getMetadata(modelClass)
    return entitySchema.columns.map(col => {
        return `${alias}.${col.databaseName} AS ${col.propertyName}`
    })
}
export default rowToModelPropertyMapper
