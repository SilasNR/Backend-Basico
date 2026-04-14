import { IsNumber, Min , IsOptional, } from 'class-validator';

export class CreatePedidoListaDto {
  @IsNumber()
  codigo: number; // Alterado para 'codigo' para bater com o loop do Service

  @IsNumber()
  @Min(1, { message: 'A quantidade deve ser pelo menos 1' })
  quantidade: number;

  @IsNumber()
  @IsOptional()
  valor?: number;
}
