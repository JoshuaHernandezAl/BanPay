import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { validate as isUUID } from "uuid";

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const { username, roles } = createUserDto;
    const user = await this.userRepository.findOneBy({ username:username.toLowerCase().trim() });
    console.log(user);
    if (user) {
      throw new BadRequestException('User already exists');
    }
    const newUser = this.userRepository.create({
      username,
      roles: [...roles]
    });
    await this.userRepository.save(newUser);
    return newUser;
  }

  findAll() {
    return this.userRepository.find();
  }

  async findOne(term: string) {
    const user = isUUID(term) ? await this.userRepository.findOneBy({ id: term }) : await this.userRepository.findOneBy({ username: term.toLowerCase().trim() });
    if (!user) {
      throw new BadRequestException('User not found');
    }
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    await this.findOne(id);
    const newUser = await this.userRepository.preload({
      id,
      ...updateUserDto
    })
    return this.userRepository.save(newUser);
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.userRepository.delete(id);
  }
}
