const MongoClient = require('mongodb').MongoClient;
const config = require('../config');

module.exports = MongoClient.connect(config.database.url, {useNewUrlParser: true})
    .then((database) => {
        return database.db(config.database.name).collection('sessions');
    });