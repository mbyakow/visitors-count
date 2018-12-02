const config = require('../config');

class VisitTracking {
    constructor(db, req) {
        this.db    = db;
        this.visit = {
            ip: req.header('x-forwarded-for') || req.connection.remoteAddress,
            created_at: new Date()
        };

        const targetPeriod = config.app.showVisitsForPeriod * 1000 * 60;
        this.filter        = {
            created_at: {
                $gte: new Date(Date.now() - targetPeriod)
            }
        };

        return this.isSaveAllowed()
            .then((isSaveAllowed) => this.saveVisit(isSaveAllowed))
            .then(() => this.getVisitsCount());
    }

    isSaveAllowed() {
        const countOnlyUnique = config.app.countOnlyUniqueVisits !== 'false'
            && config.app.countOnlyUniqueVisits !== false;

        return ! countOnlyUnique ? new Promise((resolve) => {
            resolve(true);
        }) : this.db.countDocuments({
            ...this.filter,
            ip: this.visit.ip,
        }).then((count) => {
            return count === 0;
        })
    };

    saveVisit(isSaveAllowed) {
        return isSaveAllowed ? this.db.insertOne(this.visit) : false;
    };

    getVisitsCount() {
        return this.db.countDocuments({
            ...this.filter
        })
    }
}

module.exports = VisitTracking;