'use strict';
/**
 * Operations on /markdown/{id}
 */
module.exports = {
    /**
     * summary: 
     * description: Returns markdown and associated HTML
     * parameters: id
     * produces: 
     * responses: 200, default
     */
    get: function (req, reply) {
        const db = req.server.plugins['hapi-mongodb'].db;
        const ObjectId = req.server.plugins['hapi-mongodb'].ObjectID;
        db.collection('docs').
            findOne({_id: new ObjectId(req.params.id)}, (err, result) => {
                if (err) throw err;
                reply(result);
            }
        );
    }
};
