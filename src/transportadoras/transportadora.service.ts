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
      // 1. DEDUPLICAÇÃO: Remove estados repetidos que vieram no JSON
      // Usamos o nome como chave para garantir que cada estado seja único nesta transportadora
      const estadosUnicos = Array.from(
        new Map(data.estado.map((item) => [item.nome?.toLowerCase().trim(), item])).values()
      );

      const itensLista: Estado[] = [];

      for (const item of estadosUnicos) {
        // 2. BUSCA OU CRIA: Verifica se o estado já existe no banco global
        // (Para não criar um novo ID para "SP" toda vez que cadastrar uma transportadora nova)
        let estado = await queryRunner.manager.findOne(Estado, {
          where: { Nome: item.nome },
        });

        if (!estado) {
          // Se não existe no banco, cria um novo
          estado = queryRunner.manager.create(Estado, {
            Nome: item.nome,
            Sigla: item.sigla,
          });
          estado = await queryRunner.manager.save(estado);
        }

        itensLista.push(estado);
      }

      // 3. CRIAÇÃO DA TRANSPORTADORA
      const transportadora = queryRunner.manager.create(Transportadora, {
        ...data,
        nome: String(data.nome),
        cnpj: data.cnpj ? String(data.cnpj) : null,
        endereco: data.endereco ? String(data.endereco) : null,
        lista: itensLista, // Aqui salvamos a lista sem duplicados
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
