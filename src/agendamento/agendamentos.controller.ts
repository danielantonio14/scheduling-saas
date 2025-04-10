import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { AgendamentoService } from './agendamento.service';
import { Agendamento } from './agendamento.entity';

@Controller('agendamentos')
export class AgendamentosController {
  constructor(private readonly agendamentoService: AgendamentoService) {}

  @Post()
  create(@Body() agendamento: Agendamento) {
    return this.agendamentoService.create(agendamento);
  }

  @Get()
  findAll() {
    return this.agendamentoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.agendamentoService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() agendamento: Agendamento) {
    return this.agendamentoService.update(id, agendamento);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.agendamentoService.delete(id);
  }
}
