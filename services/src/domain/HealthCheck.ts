export interface HealthCheckResponse {
  message: string;
  timestamp: Date;
  status: 'healthy' | 'unhealthy';
}

export interface HealthCheckRepository {
  checkHealth(): Promise<HealthCheckResponse>;
}