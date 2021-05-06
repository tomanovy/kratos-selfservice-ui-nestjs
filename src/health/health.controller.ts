import { Controller, Get } from '@nestjs/common';
import { HealthCheck, HealthCheckService, HttpHealthIndicator } from '@nestjs/terminus';


/** Healh check interface
 * https://docs.nestjs.com/recipes/terminus
 * 
 * 
 */
@Controller('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private http: HttpHealthIndicator,
  ) {}

  @Get()
  @HealthCheck()
  check() {
    return this.health.check([
        async () => this.http.pingCheck('index', 'http://localhost:3000'),
    ]);
  }
}