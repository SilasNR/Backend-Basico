import { IsString, IsNumber } from 'class-validator';

export class CreateProdutoDto {
  @IsString()
  codigo: string;

  @IsString()
  observacao: string;

  @IsNumber()
  quantidade: number;
}
