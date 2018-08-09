const knex = require('knex');

exports.register = (container) => {
    container.singleton('database', async () => {
        let config           = await container.make('config');
        let paginator        = await container.make('database.paginator');
        let connection       = knex(config.database[process.env.NODE_ENV]);
        connection.paginator = paginator;
        return connection;
    });
};

exports.boot = async (container) => {
};
