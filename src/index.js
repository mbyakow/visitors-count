const express       = require('express');
const compression   = require('compression');
const helmet        = require('helmet');
const app           = express();
const config        = require('../config');
const db            = require('./db');
const VisitTracking = require('./visitTracking');

const PORT = config.app.port;

const handleError = (error) => {
    console.log(error);
};

app.use(compression());
app.use(helmet());

const start = () => {
    return db.then((db) => {
        app.listen(PORT, '0.0.0.0', () => {
            console.log(`We are live on ${PORT}`);
        });

        app.get('/', (req, res) => {
            const showVisitsCount = (count) => {
                res.send(count ? parseInt(count) : 0, {}, 200);
            };

            new VisitTracking(db, req)
                .then(showVisitsCount)
                .catch(handleError);
        });
    })
    .catch(() => {
        console.log('Can\'t connect to database. Retry in 5 seconds.');
        setTimeout(start, 5000);
    });
};

start();
