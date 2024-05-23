import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { GhibliQueryConfigDto } from './dto/ghibli-endpoints.dto';
import { UserService } from '../user/user.service';
import axios from 'axios';
import { envs } from 'src/config/envs';


interface GhibliById {
  username: string;
  ghibliEnpdoint: string;
  id: string;
}

@Injectable()
export class StudioGhibliService {

  constructor(
    private readonly userService: UserService
  ) { }

  async fetchGhibli(username: string, ghibliEnpdoint: string, ghibliQueryConfigDto: GhibliQueryConfigDto) {
    const { roles } = await this.userService.findOne(username);
    const { limit, idGhibli } = ghibliQueryConfigDto

    if (!roles.includes('admin') && !roles.includes(ghibliEnpdoint)) {
      throw new UnauthorizedException('Not authorized');
    }

    if(!ghibliQueryConfigDto[ghibliEnpdoint]){
      throw new BadRequestException('Ghibli endpoint not found');
    }

    if(!idGhibli){
      const { data } = await axios.get(`${envs.ghibliUrl}/${ghibliEnpdoint}?fields=${ghibliQueryConfigDto[ghibliEnpdoint].join(',')}&limit=${limit}`,)
      return data;
    }

    const { data } = await axios.get(`${envs.ghibliUrl}/${ghibliEnpdoint}/${idGhibli}?fields=${ghibliQueryConfigDto[ghibliEnpdoint].join(',')}&limit=${limit}`,)
    return data;
  }

}
