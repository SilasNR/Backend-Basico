import {
  IsString,
} from 'class-validator';

export class CreateRegiaoDto {
  @IsString()
  nome: string;

  @IsString()
  cep: string;
}