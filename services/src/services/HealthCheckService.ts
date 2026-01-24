import { HealthCheckResponse, HealthCheckRepository } from '../domain/index.js';

export class HealthCheckService implements HealthCheckRepository {
  async checkHealth(): Promise<HealthCheckResponse> {
    return {
      message: 'pong',
      timestamp: new Date(),
      status: 'healthy'
    };
  }
}