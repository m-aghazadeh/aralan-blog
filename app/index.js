const express = require('express');
const app = express();

require('./bootstrap')(app);
require('./midlewares')(app);
require('./routes')(app)

module.exports = () => {
    const port = process.env.APP_PORT;
    app.listen(port, () => {
        console.log('app is runnig on port '+port);
    });
}; 