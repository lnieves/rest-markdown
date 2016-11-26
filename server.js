'use strict';

const Hapi = require('hapi'),
    Swaggerize = require('swaggerize-hapi'),
    Path = require('path'),
    mongo = require('hapi-mongodb'),
    Markdown = require('./plugins/markdown');

const Server = new Hapi.Server();

Server.connection({
    port: process.env.PORT || 10010
});

Server.register({
    register: mongo,
    options: {
        url: 'mongodb://mongo:27017/markdown'
    }
}, (error) => {
    if (error) {
        console.log(error);
        process.exit(2);
    }
});

Server.register(Markdown, (error) => {
    if (error) throw error;
});

Server.register({
    register: Swaggerize,
    options: {
        api: Path.resolve('./config/swagger.yaml'),
        handlers: Path.resolve('./handlers')
    }
}, function () {
    Server.start(function () {
        Server.plugins.swagger.setHost(Server.info.host + ':' + Server.info.port);
        /* eslint-disable no-console */
        console.log('App running on %s:%d', Server.info.host, Server.info.port);
        /* eslint-disable no-console */
    });
});