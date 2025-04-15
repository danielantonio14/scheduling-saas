import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Agendamento } from './agendamento/agendamento.entity';
import { AgendamentosModule } from './agendamento/agendamentos.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'daniel',
      password: '123',
      database: 'scheduling-saas',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
      logging: true,
    }),
    TypeOrmModule.forFeature([Agendamento]),
    AgendamentosModule,
    AuthModule,
    UsersModule,
  ],
})
export class AppModule {}
