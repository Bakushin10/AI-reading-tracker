import { HealthCheckResponse, HealthCheckRepository } from '../domain/entities/index.js';

export class HealthCheckService implements HealthCheckRepository {
  async checkHealth(): Promise<HealthCheckResponse> {
    return {
      message: 'pong',
      timestamp: new Date(),
      status: 'healthy'
    };
  }
}