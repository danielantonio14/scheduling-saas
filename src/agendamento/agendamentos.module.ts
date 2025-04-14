import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Agendamento } from './agendamento.entity';
import { AgendamentoService } from './agendamento.service';
import { AgendamentosController } from './agendamentos.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Agendamento])],
  providers: [AgendamentoService],
  controllers: [AgendamentosController],
})
export class AgendamentosModule {}
