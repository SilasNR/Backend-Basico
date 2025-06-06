import {IsNumber } from 'class-validator';

export class CreatePedidoListaDto {
    @IsNumber()
    codigoProduto : number;

    @IsNumber()
    quantidade : number;
}
