import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

@Injectable()
export class DatabaseService implements OnModuleInit {
  constructor(@InjectDataSource() private readonly dataSource: DataSource) {}

  async onModuleInit() {
    try {
      await this.dataSource.query('SELECT 1');
      console.log('✅ Database connection successful!');
      console.log(`📊 Connected to database: ${this.dataSource.options.database}`);
    } catch (error) {
      console.error('❌ Database connection failed:', error.message);
      throw error;
    }
  }

  async testConnection(): Promise<boolean> {
    try {
      await this.dataSource.query('SELECT 1');
      return true;
    } catch (error) {
      console.error('Database connection test failed:', error.message);
      return false;
    }
  }
}