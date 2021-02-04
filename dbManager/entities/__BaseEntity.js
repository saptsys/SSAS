module.exports = {
    id: {
        name: 'id',
        type: 'integer',
        primary: true,
        generated: true
    },
    createdAt: {
        name: 'created_at',
        type: 'text',
        createDate: true
    },
    createdBy: {
        name: 'created_by',
        type: 'integer',
        default: 0
    },
    modifiedAt: {
        name: 'modified_at',
        type: 'text',
        updateDate: true
    },
    modifiedBy: {
        name: 'modified_by',
        type: 'integer',
        default: 0,
    }
}