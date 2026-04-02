import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TransportadoraService } from './transportadora.service';
import { CreateTransportadoraDto } from './dto/create-transportadora.dto';
import { UpdateTransportadoraDto } from './dto/update-transportadora.dto';

@Controller('transportadora')
export class TransportadoraController {
  constructor(private readonly transportadoraService: TransportadoraService) { }

  @Post()
  create(@Body() createTransportadoraDto: CreateTransportadoraDto) {
    return this.transportadoraService.create(createTransportadoraDto);
  }

  @Get()
  findAll() {
    return this.transportadoraService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.transportadoraService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTransportadoraDto: UpdateTransportadoraDto) {
    return this.transportadoraService.update(+id, updateTransportadoraDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.transportadoraService.remove(+id);
  }
}
