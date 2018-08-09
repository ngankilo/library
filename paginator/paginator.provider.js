const DatabasePaginator = require('./database-paginator');
const MongoPaginator    = require('./mongo-paginator');

module.exports.register = async (container) => {
    container.singleton('database.paginator', async () => {
        let config = await container.make('config');
        
        return new DatabasePaginator().setItems(config.paginator.items);
    });
    
    container.singleton('mongo.paginator', async () => {
        let config = await container.make('config');
        
        return new MongoPaginator().setItems(config.paginator.items);
    });
};
