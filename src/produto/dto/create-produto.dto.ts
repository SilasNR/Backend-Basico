import { IsString, IsNumber } from 'class-validator';

export class CreateProdutoDto {
  @IsString()
  codigo: string;

  @IsNumber()
  quantidade: number;
}
