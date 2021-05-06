import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
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

  app.enableShutdownHooks();

  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('hbs');
  await app.listen(3000);
}
bootstrap();
