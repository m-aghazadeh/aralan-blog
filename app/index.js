const express = require('express');
const app = express();

require('./bootstrap')(app);
require('./middlewares')(app);
require('./routes')(app);

module.exports = () => {
    const port = process.env.APP_PORT;
    app.listen(port, () => {
        console.log('app is runing on port ' + port);
    });
};