import { IsString, IsNumber, IsOptional, Min } from 'class-validator';

export class CreateProdutoDto {
  @IsString()
  codigo: string;

  @IsString()
  @IsOptional() // Permite que a observação venha vazia
  observacao?: string;

  @IsNumber()
  @Min(0)
  quantidade: number;

  @IsNumber()
  @Min(1) // Geralmente um pacote tem pelo menos 1 item
  pacote: number;

  @IsNumber()
  @Min(1)
  caixa: number;

  // --- NOVOS CAMPOS PARA O CÁLCULO DE CUBAGEM ---

  @IsNumber()
  @Min(0)
  altura: number;

  @IsNumber()
  @Min(0)
  largura: number;

  @IsNumber()
  @Min(0)
  comprimento: number;
}
