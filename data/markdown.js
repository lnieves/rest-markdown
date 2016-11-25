'use strict';
var Mockgen = require('./mockgen.js');
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
     * operationId: saveMarkdown
     */
    put: {
        201: function (req, res, callback) {
            /**
             * Using mock data generator module.
             * Replace this by actual data for the api.
             */
            Mockgen().responses({
                path: '/markdown',
                operation: 'put',
                response: '201'
            }, callback);
        },
        default: function (req, res, callback) {
            /**
             * Using mock data generator module.
             * Replace this by actual data for the api.
             */
            Mockgen().responses({
                path: '/markdown',
                operation: 'put',
                response: 'default'
            }, callback);
        }
    }
};
