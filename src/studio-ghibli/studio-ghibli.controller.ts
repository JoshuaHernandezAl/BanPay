import { Controller, Get, Param, ParseUUIDPipe, Query } from '@nestjs/common';
import { StudioGhibliService } from './studio-ghibli.service';
import { GhibliQueryConfigDto } from './dto/ghibli-endpoints.dto';

@Controller('studio-ghibli')
export class StudioGhibliController {
  constructor(private readonly studioGhibliService: StudioGhibliService) {}

  @Get(':username/:ghibliEnpdoint')
  fetchGhibli(
    @Param('username') username: string,
    @Param('ghibliEnpdoint') ghibliEnpdoint: string,
    @Query() ghibliQueryConfigDto: GhibliQueryConfigDto
  ) {

    return this.studioGhibliService.fetchGhibli(username, ghibliEnpdoint, ghibliQueryConfigDto);
  }
}
