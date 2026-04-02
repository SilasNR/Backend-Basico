import {
  IsString,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

// Classe interna
class RegiaoDto {
  @IsString()
  nome: string;

  @IsString()
  cep: string;
}

class CreateEstadoDto {
  @IsString()
  nome: string;

  @IsString()
  estado: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => RegiaoDto) // Necessário para o class-transformer instanciar o ProdutoDto
  produtos: RegiaoDto[];
}