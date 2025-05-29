import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Produto } from './entities/produto.entity';

@Injectable()
export class ProdutoService {
  constructor(
    @InjectRepository(Produto)
    private produtoRepository: Repository<Produto>,
  ) {}

  async create(data: { codigo: string; quantidade: number }) {
    const produto = this.produtoRepository.create(data);
    return this.produtoRepository.save(produto);
  }

  findAll() {
    return this.produtoRepository.find();
  }

  findOne(id: number) {
    return this.produtoRepository.findOne({ where: { id } });
  }

  update(id: number, updateProdutoDto: Partial<Produto>) {
    return this.produtoRepository.update(id, updateProdutoDto);
  }

  remove(id: number) {
    return this.produtoRepository.delete(id);
  }

  // 🔥 Deletar vários
  async removeMany(ids: number[]) {
    console.log('IDs recebidos para deletar:', ids);
    return this.produtoRepository.delete(ids);
  }
}
