import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Produto } from './entities/produto.entity';
import { CreateProdutoDto } from './dto/create-produto.dto';

@Injectable()
export class ProdutoService {
  constructor(
    @InjectRepository(Produto)
    private produtoRepository: Repository<Produto>,
  ) {}

  async create(data: CreateProdutoDto) {
    // 1. Verifica se já existe
    const produtoExistente = await this.produtoRepository.findOne({
      where: { codigo: data.codigo },
    });

    if (produtoExistente) {
      throw new BadRequestException(
        'Este código de produto já está cadastrado.',
      );
    }

    // 2. Calcula a cubagem unitária baseada nas medidas digitadas
    // Se o usuário não enviou alguma medida, assume 0
    const altura = Number(data.altura || 0);
    const largura = Number(data.largura || 0);
    const comprimento = Number(data.comprimento || 0);

    const cubagemCalculada = (altura * largura * comprimento) / 100000;

    // 3. Cria a entidade com TODOS os campos
    const novoProduto = this.produtoRepository.create({
      ...data,
      altura,
      largura,
      comprimento,
      cubagem: cubagemCalculada, // Aqui o sistema salva a cubagem padrão
      quantidade: Number(data.quantidade || 0),
      pacote: Number(data.pacote || 1),
      caixa: Number(data.caixa || 1),
    });

    return await this.produtoRepository.save(novoProduto);
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
