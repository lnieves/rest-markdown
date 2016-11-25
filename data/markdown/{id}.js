'use strict';
var Mockgen = require('../mockgen.js');
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
     * operationId: getMarkdown
     */
    get: {
        200: function (req, res, callback) {
            /**
             * Using mock data generator module.
             * Replace this by actual data for the api.
             */
            Mockgen().responses({
                path: '/markdown/{id}',
                operation: 'get',
                response: '200'
            }, callback);
        },
        default: function (req, res, callback) {
            /**
             * Using mock data generator module.
             * Replace this by actual data for the api.
             */
            Mockgen().responses({
                path: '/markdown/{id}',
                operation: 'get',
                response: 'default'
            }, callback);
        }
    }
};
