const Redis = require('redis');

exports.register = (container) => {

    container.singleton('redis', async () => {
        let config = await container.make('config');

        return new Redis(config.redis);
    });
};
