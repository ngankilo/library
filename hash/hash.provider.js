const BCryptHahser = require('./bcrypt-hasher');
const bcrypt       = require('bcryptjs');

exports.register = (container) => {
    container.singleton('hash', async () => {
        let config = await container.make('config');

        return new BCryptHahser(bcrypt).setRounds(config.hash.rounds);
    });
};
