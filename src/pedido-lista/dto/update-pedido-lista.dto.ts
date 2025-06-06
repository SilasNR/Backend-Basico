import { PartialType } from '@nestjs/mapped-types';
import { CreatePedidoListaDto } from './create-pedido-lista.dto';

export class UpdatePedidoListaDto extends PartialType(CreatePedidoListaDto) {}
