import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { DatabaseService } from './database/database.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly databaseService: DatabaseService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('health')
  async healthCheck() {
    const dbConnected = await this.databaseService.testConnection();
    return {
      status: 'OK',
      timestamp: new Date().toISOString(),
      database: dbConnected ? 'Connected' : 'Disconnected',
    };
  }

  @Get('db-test')
  async databaseTest() {
    try {
      const result = await this.databaseService.testConnection();
      return {
        success: result,
        message: result ? 'Database connection successful' : 'Database connection failed',
      };
    } catch (error) {
      return {
        success: false,
        message: 'Database connection error',
        error: error.message,
      };
    }
  }
}
