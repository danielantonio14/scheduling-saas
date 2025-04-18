import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Agendamento } from './agendamento.entity';

@Injectable()
export class AgendamentoService {
  constructor(
    @InjectRepository(Agendamento)
    private readonly repo: Repository<Agendamento>,
  ) {}

  create(data: Partial<Agendamento>) {
    const agendamento = this.repo.create(data);
    return this.repo.save(agendamento);
  }

  findAll() {
    return this.repo.find();
  }
  findOne(id: string) {
    return this.repo.findOne({ where: { id } });
  }
  update(id: string, data: Partial<Agendamento>) {
    return this.repo.update(id, data);
  }
  delete(id: string) {
    return this.repo.delete(id);
  }
}
