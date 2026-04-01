import { Injectable } from '@nestjs/common';
import { CreateTransportadoraDto } from './dto/create-transportadora.dto';
import { UpdateTransportadoraDto } from './dto/update-transportadora.dto';

@Injectable()
export class TransportadoraService {
  create(createTransportadoraDto: CreateTransportadoraDto) {
    return 'This action adds a new transportadora';
  }

  findAll() {
    return `This action returns all transportadoras`;
  }

  findOne(id: number) {
    return `This action returns a #${id} transportadora`;
  }

  update(id: number, updateTransportadoraDto: UpdateTransportadoraDto) {
    return `This action updates a #${id} transportadora`;
  }

  remove(id: number) {
    return `This action removes a #${id} transportadora`;
  }
}
