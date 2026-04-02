import { Module } from '@nestjs/common';
import { TransportadoraService } from './transportadora.service';
import { TransportadoraController } from './transportadora.controller';

@Module({
  controllers: [TransportadoraController],
  providers: [TransportadoraService],
})
export class TransportadoraModule {


}
