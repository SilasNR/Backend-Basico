import { IsNumber, IsDate, IsString, IsOptional, } from 'class-validator';

export class CreateCotacaoDto {
  @IsString()
  tranportadora: string;

  @IsString()
  numero: string;

  @IsDate()
  data: Date;

  @IsString()
  prazo: string;

  @IsNumber()
  @IsOptional()
  valor?: number;
}
