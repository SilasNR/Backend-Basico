import { Module } from '@nestjs/common';
import { TransportadoraService } from './transportadora.service';
import { TransportadoraController } from './transportadora.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transportadora } from './entities/transportadora.entity';
import { Estado } from './entities/estado.entity';
import { Regiao } from './entities/regiao.entity';

@Module({
  imports: [
      TypeOrmModule.forFeature([Transportadora, Estado,Regiao]), // <-- Importa o repositório aqui!
    ],
  controllers: [TransportadoraController],
  providers: [TransportadoraService],
})
export class TransportadoraModule {


}
