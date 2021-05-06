"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const express_handlebars_1 = require("express-handlebars");
const path_1 = require("path");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useStaticAssets(path_1.join(__dirname, '..', 'public'));
    app.setBaseViewsDir(path_1.join(__dirname, '..', 'views'));
    app.setViewEngine('hbs');
    app.engine('hbs', express_handlebars_1.default({
        extname: 'hbs',
        layoutsDir: `${__dirname}/../views/layouts/`,
        partialsDir: `${__dirname}/../views/partials/`,
        defaultLayout: 'main',
        helpers: Object.assign(Object.assign({}, require('handlebars-helpers')()), { json: (context) => JSON.stringify(context), jsonPretty: (context) => JSON.stringify(context, null, 2), onlyNodes,
            getTitle, toUiNodePartial: toUiNodePartial, logoutUrl: () => `${config.kratos.browser}/self-service/browser/flows/logout` }),
    }));
    await app.listen(3000);
}
bootstrap();
require('dotenv').config({ path: '../.env' });
const auth_filters_1 = require("./auth/auth.filters");
 * as;
session;
from;
'express-session';
const fs = require('fs');
const hbs = require('hbs');
async function bootstrap() {
    const app = await core_1.NestFactory.create;
    ;
     > (app_module_1.AppModule);
    app.use(session({ secret: process.env.SESSION, _KEY, cookie: { maxAge: 86400000,
        } }));
    app.useGlobalFilters(new auth_filters_1.HttpExceptionFilter());
    app.useStaticAssets(path_1.join(_, _dirname, '..', 'public'));
    app.setBaseViewsDir(path_1.join(_, _dirname, '..', 'views'));
    app.setViewEngine('hbs');
    loadComponents('templates');
    loadComponents('auth');
    require('handlebars-form-helpers').register(hbs.handlebars);
    await app.listen(3000);
}
bootstrap();
function loadComponents(pathName) {
    const partialsDir = , _, _dirname;
    +`/../views/${pathName}`;
    const filenames = fs.readdirSync(partialsDir);
    filenames.forEach(function (filename) {
        var matches = /^([^.]+).hbs$/.exec(filename);
        if (!matches) {
            return;
        }
        const name = `${pathName}_${matches[1]}`;
        const template = fs.readFileSync(partialsDir + '/' + filename, 'utf8');
        hbs.registerPartial(name, template);
    });
}
//# sourceMappingURL=main.js.map