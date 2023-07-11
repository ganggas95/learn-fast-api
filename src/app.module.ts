import { ConfigModule } from '@nestjs/config';

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOption } from '../db/data-source';
import { UserModule } from './user/user.module';
import { LoginModule } from './login/login.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    // This is configuration for database
    // Here we using postgres
    TypeOrmModule.forRoot(dataSourceOption),
    UserModule,
    LoginModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
