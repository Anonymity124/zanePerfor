'use strict';

module.exports = appInfo => {
    const config = exports = {};

    // use for cookie sign key, should change to your own and keep security
    config.keys = '_1536915742607_3127';

    // add your config here
    config.middleware = [];

    config.name = '性能监控系统';

    config.description = '性能监控系统';

    // debug 为 true 时，用于本地调试
    config.host = 'http://performance.seosiwei.com';

    // 务必修改config.debug = true;
    config.session_secret = 'node_club_secret';

    // ejs模板
    config.view = {
        defaultExtension: '.html',
        mapping: {
            '.html': 'ejs',
        },
    };
    config.ejs = {
        layout: 'layout.html',
    };

    // redis配置
    config.redis = {
        client: {
            port: 6379, // Redis port
            host: '127.0.0.1', // Redis host
            password: 'auth',
            db: 0,
        },
    };

    // mongoose配置
    exports.mongoose = {
        url: 'mongodb://127.0.0.1:27017/zane_performance',
        options: {
            server: { poolSize: 20 },
        },
    };

    // exports.security = {
    //     csrf: {
    //         enable: false,
    //     },
    // };

    config.bodyParser = {
        jsonLimit: '10mb',
        formLimit: '10mb',
    };

    config.security = {
        domainWhiteList:['http://127.0.0.1:18090'],
        csrf: {
            ignore: '/api/v1/user/report',
        },
    };

    config.cors = {
        origin: '*',
        allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
    };

    config.onerror = {
        all(err, ctx) {
            // 在此处定义针对所有响应类型的错误处理方法
            // 注意，定义了 config.all 之后，其他错误处理方法不会再生效
            console.log('----------error信息begin----------');
            console.log(err);
            console.log('----------error信息end----------');
            ctx.body = 'error';
            ctx.status = 500;
        },
        html(err, ctx) {
            // html hander
            ctx.body = '<h3>error</h3>';
            ctx.status = 500;
        },
        json(err, ctx) {
            // json hander
            ctx.body = { message: 'error' };
            ctx.status = 500;
        },
        jsonp(err, ctx) {
            // 一般来说，不需要特殊针对 jsonp 进行错误定义，jsonp 的错误处理会自动调用 json 错误处理，并包装成 jsonp 的响应格式
        },
    };

    return config;
};
