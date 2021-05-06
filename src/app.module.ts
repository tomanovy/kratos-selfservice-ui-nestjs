import { TerminusModule } from '@nestjs/terminus';
import { HealthController } from './health/health.controller';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [TerminusModule],
  controllers: [AppController, HealthController ],
  providers: [AppService],
})
export class AppModule {}
