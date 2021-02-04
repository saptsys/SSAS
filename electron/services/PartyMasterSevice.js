const __BaseService = require("./__BaseService");
const Models = require("../../dbManager/models/index");
const { Connection, getConnection, createConnection } = require("typeorm");
const promiseIpc = require("electron-promise-ipc")
class PartyMasterService extends __BaseService {
  /**
   *
   * @param {Connection} connection
   */
  constructor() {
    super()
    //define repositories which is required
    //you can pass array also
    this.partyMSTRepo = getConnection().getRepository(Models.PartyMaster);
  }

  /**
   *
   * @param {Models.PartyMaster} party
   */
  saveParty(party) {
    return this.partyMSTRepo.save(party);
  }

  getAll() {
    return this.partyMSTRepo.find();
  }
}

promiseIpc.on("users/getAll", () => {
    return new PartyMasterService().getAll()
});

module.exports = PartyMasterService;
