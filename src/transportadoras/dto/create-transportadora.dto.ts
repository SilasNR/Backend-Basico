import {
  IsString,
  IsArray,
  ValidateNested,
  IsOptional,
} from 'class-validator';
import { Type } from 'class-transformer';

// Classe interna para os itens do pedido
class RegiaoDto {
  @IsString()
  nome: string;

  @IsString()
  cep: string;
}

class EstadoDto {
  @IsString()
  nome: string;

  @IsString()
  estado: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => RegiaoDto) // Necessário para o class-transformer instanciar o Dto
  produtos: RegiaoDto[];
}

export class CreateTransportadoraDto {
  @IsString()
  nome: string;

  @IsString()
  @IsOptional()
  cnpj?: string;

  @IsString()
  @IsOptional()
  endereco?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => EstadoDto) // Necessário para o class-transformer instanciar o Dto
  produtos: EstadoDto[];
}
