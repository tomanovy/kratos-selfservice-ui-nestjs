import { HealthCheckService, HttpHealthIndicator } from '@nestjs/terminus';
export declare class HealthController {
    private health;
    private http;
    constructor(health: HealthCheckService, http: HttpHealthIndicator);
    check(): Promise<import("@nestjs/terminus").HealthCheckResult>;
}
