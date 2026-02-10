import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';
import { User } from './users/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'betsegawnegn',
      database: 'sell_db',
      entities: [User],
      synchronize: process.env.NODE_ENV === 'development', // Only sync in development
      autoLoadEntities: true,
      logging: process.env.NODE_ENV === 'development', // Log SQL queries in development
      // Add extra logging for debugging
      logger: 'advanced-console',
    }),
    DatabaseModule,
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}