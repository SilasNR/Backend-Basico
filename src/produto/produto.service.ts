import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';
import { Produto } from './entities/produto.entity';

@Injectable()
export class ProdutoService {
  private produtos: Produto[] = [];
  produtoRepository: any;

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

  async remove(id: number) {
    const produto = await this.produtoRepository.findOne({ where: { id } });

    if (!produto) {
      throw new NotFoundException(`Produto com ID ${id} não encontrado`);
    }

    await this.produtoRepository.remove(produto);
  }
}
