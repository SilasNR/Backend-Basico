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

      for (const item of data.estado) {
        // 1. Buscamos o estado que já existe
        const estadoAtual = await queryRunner.manager.findOne(Estado, {
          where: { Nome: item.nome },
        });

        if (!estadoAtual) {
          throw new NotFoundException(`Estado ${item.nome} não encontrado`);
        }

        // 2. CORREÇÃO: Adicione o estado retornado do banco, NÃO use o .create()
        itensLista.push(estadoAtual);
      }

      // 3. Criamos a transportadora vinculando os estados existentes
      const transportadora = queryRunner.manager.create(Transportadora, {
        ...data, // O spread já traz nome, cnpj, endereco se os nomes no DTO forem iguais aos da Entity
        lista: itensLista,
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
