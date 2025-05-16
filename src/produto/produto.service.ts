import { Injectable } from '@nestjs/common';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';
import { Produto } from './entities/produto.entity';

@Injectable()
export class ProdutoService {
  private produtos: Produto[] = [];

  create(createProdutoDto: CreateProdutoDto): Produto {
    const { codigo, quantidade } = createProdutoDto;

    // Validação básica (opcional, se já tiver DTO com class-validator)
    if (!codigo || quantidade === undefined) {
      throw new Error('Dados inválidos');
    }

    const novoProduto: Produto = {
      id: this.produtos.length + 1,
      codigo,
      quantidade,
    };

    this.produtos.push(novoProduto);
    return novoProduto;
  }

  findAll(): Produto[] {
    return this.produtos;
  }


  findOne(id: number) {
    return `This action returns a #${id} produto`;
  }

  update(id: number, updateProdutoDto: UpdateProdutoDto) {
    return `This action updates a #${id} produto`;
  }

  remove(id: number) {
    return `This action removes a #${id} produto`;
  }
}
