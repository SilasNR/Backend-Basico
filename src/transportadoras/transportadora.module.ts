import { Module } from '@nestjs/common';
import { TransportadoraService } from './transportadora.service';
import { TransportadoraController } from './transportadora.controller';
import { Estado } from './entities/estado.entity';
import { Regiao } from './entities/regiao.entity';

@Module({
  controllers: [TransportadoraController,Estado, Regiao],
  providers: [TransportadoraService],
})
export class TransportadoraModule {

  
 }
