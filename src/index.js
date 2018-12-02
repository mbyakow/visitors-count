const express     = require('express');
const MongoClient = require('mongodb').MongoClient;
const config      = require('./config');

const app          = express();
const port         = 8000;
const targetPeriod = config.showVisitsForPeriod * 1000 * 60;

const handleError = (error) => {
    console.log(error);
};

MongoClient.connect(config.database.url, { useNewUrlParser: true })
    .then((database) => {
        return database.db('tracking').collection('sessions');
    })
    .then((db) => {
        app.listen(port, () => {
            console.log('We are live on ' + port);
        });

        app.get('/', (req, res) => {
            const visit = {
                ip: req.header('x-forwarded-for') || req.connection.remoteAddress,
                created_at: new Date()
            };

            const isSaveAllowed = () => {
                return !config.countOnlyUniqueVisits ? new Promise((resolve) => {
                    resolve(true);
                }) : db.countDocuments({
                    ip: visit.ip,
                    created_at: {
                        $gte: new Date(Date.now() - targetPeriod)
                    }
                }).then((count) => {
                    return count === 0;
                })
            };

            const saveVisit = (isSaveAllowed) => {
                return isSaveAllowed ? db.insertOne(visit) : false;
            };

            const getVisitsCount = () => {
                return db.countDocuments({
                    created_at: {
                        $gte: new Date(Date.now() - targetPeriod)
                    }
                })
            };

            const showVisitsCount = (count) => {
                res.send(parseInt(count), {}, 200);
            };

            isSaveAllowed()
                .then(saveVisit)
                .then(getVisitsCount)
                .then(showVisitsCount)
                .catch(handleError);
        });
    })
    .catch(handleError);

// не привязываться к определенному драйверу БД
// разрыв БД
