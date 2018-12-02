require('dotenv').config();
const env = process.env.NODE_ENV || 'dev';

const dev = {
    app: {
        port: parseInt(process.env.DEV_APP_PORT) || 8000,
        countOnlyUniqueVisits: process.env.DEV_COUNT_ONLY_UNIQUE || false,
        showVisitsForPeriod: process.env.DEV_SHOW_FOR_PERIOD || 1, // in minutes
    },
    database: {
        url: process.env.DEV_DB_URL || 'mongodb://localhost:27017',
        name: process.env.DEV_DB_NAME || 'tracking'
    }
};

const production = {
    app: {
        port: parseInt(process.env.TEST_APP_PORT) || 8000,
        countOnlyUniqueVisits: process.env.TEST_COUNT_ONLY_UNIQUE || false,
        showVisitsForPeriod: process.env.TEST_SHOW_FOR_PERIOD || 1, // in minutes
    },
    database: {
        url: process.env.TEST_DB_URL || 'mongodb://db',
        name: process.env.TEST_DB_NAME || 'tracking'
    }
};

const config = {
    dev,
    production
};

module.exports = config[env];