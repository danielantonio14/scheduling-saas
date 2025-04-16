// src/users/users.service.ts (corrigido)
import {
  Injectable,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from '../auth/dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      console.log('Tentando criar usuário:', createUserDto.email);
      const { email, password, nome } = createUserDto;
      const existingUser = await this.usersRepository.findOneBy({ email });
      if (existingUser) {
        throw new ConflictException('Email already exists');
      }

      console.log('Gerando hash da senha');
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = this.usersRepository.create({
        email,
        password: hashedPassword,
        nome,
      });
      console.log('Salvando usuário no banco');
      return await this.usersRepository.save(user);
    } catch (error: unknown) {
      console.error('Erro ao criar usuário:', error);
      if (error instanceof ConflictException) {
        throw error;
      }
      const message = error instanceof Error ? error.message : 'Unknown error';
      throw new InternalServerErrorException(
        `Failed to create user: ${message}`,
      );
    }
  }

  async findOne(id: number): Promise<User | null> {
    try {
      console.log('Buscando usuário por ID:', id);
      return await this.usersRepository.findOneBy({ id });
    } catch (error: unknown) {
      console.error('Erro ao buscar usuário por ID:', error);
      throw new InternalServerErrorException('Failed to find user');
    }
  }

  async findByEmail(email: string): Promise<User | null> {
    try {
      console.log('Buscando usuário por email:', email);
      return await this.usersRepository.findOneBy({ email });
    } catch (error: unknown) {
      console.error('Erro ao buscar usuário por email:', error);
      throw new InternalServerErrorException('Failed to find user by email');
    }
  }
}
