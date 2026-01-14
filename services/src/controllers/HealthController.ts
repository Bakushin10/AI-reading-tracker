import { Request, Response } from 'express';
import { HealthCheckService } from '../services/index.js';

export class HealthController {
  private healthCheckService: HealthCheckService;

  constructor() {
    this.healthCheckService = new HealthCheckService();
  }

  ping = async (_req: Request, res: Response): Promise<void> => {
    try {
      const healthCheck = await this.healthCheckService.checkHealth();
      res.status(200).json(healthCheck);
    } catch (error) {
      console.error('Health check failed:', error);
      res.status(500).json({ message: 'Health check failed' });
    }
  };
}