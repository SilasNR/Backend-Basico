import {
  IsOptional,
  IsString,
} from 'class-validator';

// Classe interna
// class MunicipioDto {
//   @IsString()
//   nome: string;

//   @IsString()
//   cep: string;
// }

export class CreateEstadoDto {
  @IsString()
  @IsOptional()
  nome?: string;

  @IsString()
  @IsOptional()
  sigla?: string;

  // @IsArray()
  // @ValidateNested({ each: true })
  // @Type(() => MunicipioDto) // Necessário para o class-transformer instanciar o ProdutoDto
  // produtos: MunicipioDto[];
}