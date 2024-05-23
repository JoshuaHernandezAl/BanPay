import { Module } from '@nestjs/common';
import { StudioGhibliService } from './studio-ghibli.service';
import { StudioGhibliController } from './studio-ghibli.controller';
import { UserService } from 'src/user/user.service';
import { UserModule } from 'src/user/user.module';

@Module({
  controllers: [StudioGhibliController],
  providers: [StudioGhibliService],
  imports: [UserModule],
})
export class StudioGhibliModule {}
