const __BaseService = require("./__BaseService");
const Models = require("../../dbManager/models/index");
const { Connection } = require("typeorm");

class PartyMasterService extends __BaseService {

    /**
     * 
     * @param {Connection} connection 
     */
    constructor(connection) {
        super(connection)

        //define repositories which is required
        //you can pass array also
        this.partyMSTRepo = connection.getRepository(Models.PartyMaster)
    }

    /**
     * 
     * @param {Models.PartyMaster} party 
     */
    saveParty(party) {
        return this.partyMSTRepo.save(party)
    }

}

module.exports = PartyMasterService