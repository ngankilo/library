const Mongo       = require('mongodb');
const Promise     = require('bluebird');
const MongoClient = Mongo.MongoClient;
const ObjectId    = Mongo.ObjectId;

let connectionPromise = Promise.promisify(MongoClient.connect, {context: MongoClient});

exports.register = (container) => {
    container.singleton('mongo', async () => {
        let config           = await container.make('config');
        let mongo            = await connectionPromise(config.mongo.host);
        let connection       = mongo.db(config.mongo.database);
        connection.paginator = await container.make('mongo.paginator');
        connection.objectId  = ObjectId;
        return connection;
    });
    
    container.singleton('objectId', async () => {
        return ObjectId;
    });
};
