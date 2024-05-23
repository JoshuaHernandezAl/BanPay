import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { envs } from './config/envs';
import { StudioGhibliModule } from './studio-ghibli/studio-ghibli.module';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type:'postgres',
      host:envs.dbHost,
      port: envs.dbPort,
      database:envs.dbName,
      username:envs.dbUsername,
      password: envs.dbPassword, 
      autoLoadEntities:true,
      synchronize:true,
    }),
    UserModule,
    StudioGhibliModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
