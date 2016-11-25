'use strict';
var dataProvider = require('../data/markdown.js');
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
    put: function saveMarkdown(req, reply, next) {
        /**
         * Get the data for response 201
         * For response `default` status 200 is used.
         */
        var status = 201;
        var provider = dataProvider['put']['201'];
        provider(req, reply, function (err, data) {
            if (err) {
                next(err);
                return;
            }
            reply(data && data.responses).code(status);
        });
    }
};
