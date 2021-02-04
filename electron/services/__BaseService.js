const { Connection } = require('typeorm')

class __BaseService {
    repositories = {};
    /**
     * @param {Connection} connection
     */
    constructor(connection, requiredRepos) {
        this.connection = connection
    }

    useRepository(model) {
        if (!this.connection)
            throw new Error("Connection not established")
        if (Array.isArray(model)) {
            model.forEach(m => {
                this.repositories = { ...this.repositories, [m.name]: this.connection.getRepository(m) }
            })
        } else {
            this.repositories = { ...this.repositories, [model.name]: this.connection.getRepository(model) }
        }
    }
}

module.exports = __BaseService