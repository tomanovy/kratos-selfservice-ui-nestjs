
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import handlebars from 'express-handlebars';
import { join } from 'path';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
  );

  /** Starts listening for shutdown hooks
   * enableShutdownHooks consumes memory by starting listeners. 
   * In cases where you are running multiple Nest apps in a single Node process (e.g., when running parallel tests with Jest), 
   * Node may complain about excessive listener processes. For this reason, enableShutdownHooks is not enabled by default. 
   * Be aware of this condition when you are running multiple instances in a single Node process.
   * */
  // app.enableShutdownHooks();

  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('hbs');
  app.engine(
    'hbs',
    handlebars({
      extname: 'hbs',
      layoutsDir: `${__dirname}/../views/layouts/`,
      partialsDir: `${__dirname}/../views/partials/`,
      defaultLayout: 'main',
      helpers: {
        ...require('handlebars-helpers')(),
        json: (context: any) => JSON.stringify(context),
        jsonPretty: (context: any) => JSON.stringify(context, null, 2),
        onlyNodes,
        getTitle,
        toUiNodePartial: toUiNodePartial,
        logoutUrl: () =>
          `${config.kratos.browser}/self-service/browser/flows/logout`,
      },
    })
  )
  await app.listen(3000);
}
bootstrap();



require('dotenv').config({ path: '../.env' }) // initialize dotenv 
import { NestFactory } from '@nestjs/core'; 
import { NestExpressApplication } from '@nestjs/platform-express'; 
import { join } from 'path'; import { AppModule } from './app.module'; 
import { HttpExceptionFilter } from './auth/auth.filters'; 
import \* as session from 'express-session' ;
const fs = require('fs'); 
const hbs = require('hbs'); 
async function bootstrap() { const app = await NestFactory.create\<NestExpressApplication\>(AppModule); // session 
  app.use(session({ secret: process.env.SESSION\_KEY, cookie: { maxAge: 86400000, // 24h 
  } })) 
  app.useGlobalFilters(new HttpExceptionFilter()); // initialize handlebars js 
  app.useStaticAssets(join(\_\_dirname, '..', 'public')); 
  app.setBaseViewsDir(join(\_\_dirname, '..', 'views')); 
  app.setViewEngine('hbs'); // load partials 
  loadComponents('templates'); 
  loadComponents('auth'); 
  require('handlebars-form-helpers').register(hbs.handlebars); 
  await app.listen(3000); } bootstrap(); 
  function loadComponents(pathName: string) { const partialsDir = \_\_dirname + `/../views/${pathName}`; 
  const filenames = fs.readdirSync(partialsDir); 
  filenames.forEach(function (filename) { var matches = /^([^.]+).hbs$/.exec(filename); 
    if (!matches) { return; } const name = `${pathName}_${matches[1]}`; 
    const template = fs.readFileSync(partialsDir + '/' + filename, 'utf8'); 
    hbs.registerPartial(name, template); }); }

