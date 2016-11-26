'use strict';
/**
 * Operations on /markdown
 */
module.exports = {
    /**
     * summary: 
     * description: Saves markdown text and converted HTML to Persistent Storage
     * parameters: markdown
     * produces: 
     * responses: 201, default
     */
    put: (req, reply, next) => {
        /**
         * Get the data for response 201
         * For response `default` status 200 is used.
         */
        const status = 201;
        const db = req.server.plugins['hapi-mongodb'].db;
        const doc = {
            source: req.payload.markdown,
            html: req.payload.html
        };
        db.collection('docs').insert(doc, (error, result) => {
            if (error) throw error;

            const response = {
                url: req.server.info.host + ':' + req.server.info.port + '/markdown/' + result.ops.pop()._id
            };
            reply(response).code(status);
        });
    }
};
