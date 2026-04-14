import {
  IsString,
  IsNumber,
  IsArray,
  ValidateNested,
  IsOptional,
  Min,
  IsDate,
} from 'class-validator';
import { Type } from 'class-transformer';

// Classe interna para os itens do pedido
class ProdutoDto {
  @IsString()
  codigo: string;

  @IsNumber()
  @Min(1) // Garante que ninguém peça 0 ou quantidades negativas
  quantidade: number;

  @IsNumber()
  @IsOptional()
  valor?: number;
}

class CotacaoDto {
  @IsString()
  tranportadora: string;

  @IsString()
  numero: number;

  @IsDate()
  data: Date;

  @IsString()
  prazo: string;

  @IsNumber()
  @IsOptional()
  valor?: number;
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
  municipio?: string;

  @IsString()
  @IsOptional()
  uf?: string;

  @IsString()
  @IsOptional()
  cep?: string;

  @IsNumber()
  @IsOptional()
  valor?: number; // Digitado pelo usuário

  @IsNumber()
  @IsOptional()
  peso?: number; // Digitado pelo usuário

  @IsNumber()
  @IsOptional()
  volume?: number; // Calculado pelo Service (mas aceita vindo do Front)

  @IsNumber()
  @IsOptional()
  cubagem?: number; // Calculado pelo Service (mas aceita vindo do Front)

  @IsNumber()
  @IsOptional()
  nf?: number;

  @IsString()
  @IsOptional()
  status?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProdutoDto) // Necessário para o class-transformer instanciar o ProdutoDto
  produtos: ProdutoDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CotacaoDto) // Necessário para o class-transformer instanciar o ProdutoDto
  cotacao: CotacaoDto[];
}
