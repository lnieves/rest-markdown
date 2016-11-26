'use strict';
const MarkdownHtml = require('../lib/MarkdownHtml');

const register  = (server, options, next) => {
    server.ext('onPreHandler', (request, reply) => {
        if (!request.payload) return reply.continue();

        const processor = new MarkdownHtml();
        request.payload.html = processor.process(request.payload.markdown);

        return reply.continue();
    });
    return next();
};

register.attributes = {
    name: 'Markdown Processor',
    version: '1.0'
};

module.exports = register;