import {
  IsString,
  IsNumber,
  IsArray,
  ValidateNested,
  IsOptional,
  isNumber,
} from 'class-validator';
import { Type } from 'class-transformer';

class ProdutoDto {
  @IsString()
  codigo: string;

  @IsNumber()
  quantidade: number;
}

export class CreatePedidoDto {
  @IsString()
  numero: string;

  @IsString()
  cliente: string;

  @IsString()
  @IsOptional()
  cnpj?: string;

  @IsString()
  @IsOptional()
  cep?: string;

  @IsNumber()
  @IsOptional()
  valor?: number;

  @IsNumber()
  @IsOptional()
  peso?: number;

  @IsNumber()
  @IsOptional()
  volume?: number;

  @IsNumber()
  @IsOptional()
  cubagem?: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProdutoDto)
  produtos: ProdutoDto[];
}
