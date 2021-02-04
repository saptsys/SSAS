const { Connection } = require('typeorm')

class __BaseService {

    /**
     * 
     */
    repositories = {};
    /**
     * @param {Connection} connection
     */
    constructor(connection, requiredRepos) {
        this.connection = connection
    }
}

module.exports = __BaseService