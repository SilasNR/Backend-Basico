import { IsString, IsNumber, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class ProdutoDto {
  @IsString()
  codigo: string;

  @IsNumber()
  quantidade: number;
}

export class CreatePedidoDto {
  @IsNumber()
  numero: number;

  @IsString()
  cliente: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProdutoDto)
  produtos: ProdutoDto[];
}