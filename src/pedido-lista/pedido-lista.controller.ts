import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PedidoListaService } from './pedido-lista.service';
import { CreatePedidoListaDto } from './dto/create-pedido-lista.dto';
import { UpdatePedidoListaDto } from './dto/update-pedido-lista.dto';

@Controller('pedido-lista')
export class PedidoListaController {
  constructor(private readonly pedidoListaService: PedidoListaService) {}

  @Post()
  create(@Body() createPedidoListaDto: CreatePedidoListaDto) {
    return this.pedidoListaService.create(createPedidoListaDto);
  }

  @Get()
  findAll() {
    return this.pedidoListaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pedidoListaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePedidoListaDto: UpdatePedidoListaDto) {
    return this.pedidoListaService.update(+id, updatePedidoListaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pedidoListaService.remove(+id);
  }
}
