import {
  IsString,
  IsArray,
  ValidateNested,
  IsOptional,
} from 'class-validator';
import { Type } from 'class-transformer';

// Classe interna para os itens do pedido
// class MunicipioDto {
//   @IsString()
//   nome: string;

//   @IsString()
//   cep: string;
// }

class EstadoDto {
  @IsString()
  @IsOptional()
  nome?: string;

  @IsString()
  @IsOptional()
  sigla?: string;

  // @IsArray()
  // @ValidateNested({ each: true })
  // @Type(() => MunicipioDto) // Necessário para o class-transformer instanciar o Dto
  // regiao: MunicipioDto[];
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
  estado: EstadoDto[];
}
