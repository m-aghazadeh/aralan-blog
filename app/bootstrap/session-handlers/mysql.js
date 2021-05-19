module.exports = session => {
    const MySQLStore = require('express-mysql-session')(session);
    const options = {
        host: process.env.MYSQL_HOST,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DATABASE,
        port: process.env.MYSQL_PORT,
        clearExpired: true,
        checkExpirationInterval: 90000000,
        expiration: 86400000000,

    };

    return new MySQLStore(options);
}
