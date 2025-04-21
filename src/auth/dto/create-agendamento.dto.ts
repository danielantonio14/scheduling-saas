// src/agendamentos/dto/create-agendamento.dto.ts
import { IsDateString, IsString, MinLength, IsIn } from 'class-validator';

export class CreateAgendamentoDto {
  @IsDateString()
  data: string;

  @IsString()
  @MinLength(5)
  hora: string;

  @IsString()
  @MinLength(3)
  cliente: string;

  @IsString()
  @MinLength(3)
  servico: string;

  @IsString()
  @IsIn(['PENDENTE', 'CONFIRMADO', 'CANCELADO'])
  status: string;
}
