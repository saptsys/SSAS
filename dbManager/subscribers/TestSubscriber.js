const { EventSubscriber } = require('typeorm');
const { ItemGroupMaster } = require('../models');
const DecorateClass = require('../_DecorateClass')


class EverythingSubscriber {
    /**
     * Returns the class of the entity to which events will listen.
     * If this method is omitted, then subscriber will listen to events of all entities.
     *
     * listenTo?(): Function;
     */
    // listenTo() {
    //     return ItemGroupMaster;
    // }

    /* afterLoad?(entity: Entity): Promise<any>|void; */
    afterLoad({ entity }) { }

    /* beforeInsert?(event: InsertEvent<Entity>): Promise<any>|void; */
    beforeInsert({ connection, queryRunner, manager, entity }) {  }

    /* beforeUpdate?(event: UpdateEvent<Entity>): Promise<any>|void; */
    beforeUpdate({ connection, queryRunner, manager, entity, databaseEntity, updatedColumns, updatedRelations }) { }

    /* beforeRemove?(event: RemoveEvent<Entity>): Promise<any>|void; */
    beforeRemove({ connection, queryRunner, manager, entity, databaseEntity, entityId }) { }

    /* afterInsert?(event: InsertEvent<Entity>): Promise<any>|void; */
    afterInsert({ connection, queryRunner, manager, entity }) { }

    /* afterUpdate?(event: UpdateEvent<Entity>): Promise<any>|void; */
    afterUpdate({ connection, queryRunner, manager, entity }) { }

    /* afterRemove?(event: RemoveEvent<Entity>): Promise<any>|void; */
    afterRemove({ connection, queryRunner, manager, entity }) { }
}

module.exports = DecorateClass(EventSubscriber(/* Decorator params */), EverythingSubscriber)