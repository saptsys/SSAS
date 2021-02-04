const __BaseService = require("./__BaseService");
const Models = require("../../dbManager/models/index");

class PartyMasterService extends __BaseService {
    constructor(connection) {
        super(connection)

        //define repositories which is required
        //you can pass array also
        this.useRepository(Models.PartyMaster)
    }

    //write function etc stuff here
}

module.exports = PartyMasterService