import {
  IsString,
} from 'class-validator';

class CreateRegiaoDto {
  @IsString()
  nome: string;

  @IsString()
  cep: string;
}