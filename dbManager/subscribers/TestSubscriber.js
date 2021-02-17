const { EventSubscriber } = require('typeorm');
const PartyMasterEntity = require('../entities/PartyMasterEntity');
const { PartyMaster } = require('../models');
const DecorateClass = require('../_DecorateClass')


class EverythingSubscriber {
    /**
     * Returns the class of the entity to which events will listen.
     * If this method is omitted, then subscriber will listen to events of all entities.
     *
     * listenTo?(): Function;
     */

    /* beforeRemove?(event: RemoveEvent<Entity>): Promise<any>|void; */
    beforeRemove(params) {
        console.log("\n\n--------------BEFORE REMOVE-----------------\n\n")
    }

    /* afterLoad?(entity: Entity): Promise<any>|void; */
    afterLoad({ entity }) {
        console.log("\n\n--------------AFTER Load-----------------\n\n")

    }

    /* beforeInsert?(event: InsertEvent<Entity>): Promise<any>|void; */
    beforeInsert({ connection, queryRunner, manager, entity }) {
        console.log("\n\n--------------Before Insert-----------------\n\n")

    }

    /* beforeUpdate?(event: UpdateEvent<Entity>): Promise<any>|void; */
    beforeUpdate({ connection, queryRunner, manager, entity, databaseEntity, updatedColumns, updatedRelations }) {
        console.log("\n\n--------------Befaore Update-----------------\n\n")

    }


    /* afterInsert?(event: InsertEvent<Entity>): Promise<any>|void; */
    afterInsert({ connection, queryRunner, manager, entity }) {
        console.log("\n\n--------------AFTER Insert-----------------\n\n")

    }

    /* afterUpdate?(event: UpdateEvent<Entity>): Promise<any>|void; */
    afterUpdate({ connection, queryRunner, manager, entity }) {
        console.log("\n\n--------------AFTER Update-----------------\n\n")

    }

    /* afterRemove?(event: RemoveEvent<Entity>): Promise<any>|void; */
    afterRemove(params) {
        console.log("\n\n--------------AFTER REMOVE-----------------\n\n")
    }
}

module.exports = DecorateClass(EventSubscriber(/* Decorator params */), EverythingSubscriber)