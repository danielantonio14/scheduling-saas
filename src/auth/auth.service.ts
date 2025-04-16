// src/auth/auth.service.ts
import {
  Injectable,
  UnauthorizedException,
  InternalServerErrorException,
  ConflictException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { RegisterResponseDto } from './dto/register-response.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(createUserDto: CreateUserDto): Promise<RegisterResponseDto> {
    try {
      console.log('Iniciando registro:', createUserDto.email);
      const user = await this.usersService.create(createUserDto);
      console.log('Usuário registrado:', user.email);
      return { id: user.id, email: user.email };
    } catch (error: unknown) {
      console.error('Erro no registro:', error);
      if (error instanceof ConflictException) {
        throw error;
      }
      const message = error instanceof Error ? error.message : 'Unknown error';
      throw new InternalServerErrorException(
        `Failed to register user: ${message}`,
      );
    }
  }

  async login(
    email: string,
    password: string,
  ): Promise<{ access_token: string }> {
    try {
      console.log('Iniciando login:', email);
      const user = await this.usersService.findByEmail(email);
      if (!user) {
        console.log('Usuário não encontrado:', email);
        throw new UnauthorizedException('Invalid credentials');
      }
      console.log('Verificando senha');
      if (!(await bcrypt.compare(password, user.password))) {
        console.log('Senha inválida para:', email);
        throw new UnauthorizedException('Invalid credentials');
      }
      console.log('Gerando token JWT');
      const payload = { sub: user.id, email: user.email };
      return {
        access_token: await this.jwtService.signAsync(payload),
      };
    } catch (error: unknown) {
      console.error('Erro no login:', error);
      if (error instanceof UnauthorizedException) {
        throw error;
      }
      const message = error instanceof Error ? error.message : 'Unknown error';
      throw new InternalServerErrorException(`Failed to login: ${message}`);
    }
  }
}
