import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTransportadoraDto } from './dto/create-transportadora.dto';
import { UpdateTransportadoraDto } from './dto/update-transportadora.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Transportadora } from './entities/transportadora.entity';
import { Repository, DataSource } from 'typeorm';
import { Estado } from './entities/estado.entity';
import { Regiao } from './entities/regiao.entity';

@Injectable()
export class TransportadoraService {
  constructor(
    @InjectRepository(Transportadora)
    private tranportadoraRepoditory: Repository<Transportadora>,
    @InjectRepository(Estado)
    private estadoRepoditory: Repository<Estado>,
    @InjectRepository(Regiao)
    private regiaoRepoditory: Repository<Regiao>,
    private dataSource: DataSource,

  ) { }


  async create(data: CreateTransportadoraDto) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const itensLista: Estado[] = [];

      // O JSON envia "estado", o código percorre "data.estado"
      for (const item of data.estado) {
        // 1. Buscamos o estado que JÁ EXISTE no banco de dados
        const estadoExistente = await queryRunner.manager.findOne(Estado, {
          where: { Nome: item.nome }, // Verifique se na sua Entity o campo é "Nome" ou "nome"
        });

        if (!estadoExistente) {
          throw new NotFoundException(`Estado ${item.nome} não encontrado`);
        }

        // 2. CORREÇÃO CRÍTICA: Adicionamos o objeto retornado do banco à lista.
        // NÃO use queryRunner.manager.create(Estado, ...) aqui, 
        // pois isso tentaria inserir um novo registro de Estado.
        itensLista.push(estadoExistente);
      }

      // 3. Criamos a transportadora associando os estados encontrados
      const transportadora = queryRunner.manager.create(Transportadora, {
        ...data,
        nome: data.nome,
        endereco: data.endereco,
        cnpj: data.cnpj ? String(data.cnpj) : null,
        lista: itensLista, // Aqui o TypeORM faz o vínculo (relação)
      });

      const transportadoraSalva = await queryRunner.manager.save(transportadora);

      await queryRunner.commitTransaction();
      return transportadoraSalva;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }

  findAll() {
    return this.tranportadoraRepoditory.find({
      relations: ['lista'],
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} transportadora`;
  }

  update(id: number, updateTransportadoraDto: UpdateTransportadoraDto) {
    return `This action updates a #${id} transportadora`;
  }

  remove(id: number) {
    return `This action removes a #${id} transportadora`;
  }
}
