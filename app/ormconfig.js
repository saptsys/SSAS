const DB_FILES_FOLDER = "dbManager"

module.exports = {
    "type": "sqlite",
    'folder': DB_FILES_FOLDER,
    "synchronize": false,
    "logging": false,
    "entities": [
        `${DB_FILES_FOLDER}/entities/**/*.js`
    ],
    "migrations": [
        `${DB_FILES_FOLDER}/migrations/**/*.js`
    ],
    "subscribers": [
        `${DB_FILES_FOLDER}/subscribers/**/*.js`
    ],
    "cli": {
        "entitiesDir": `${DB_FILES_FOLDER}/entities`,
        "migrationsDir": `${DB_FILES_FOLDER}/migrations`,
        "subscribersDir": `${DB_FILES_FOLDER}/subscribers`
    }
}