import { Test, TestingModule } from '@nestjs/testing';
import { PedidoListaController } from './pedido-lista.controller';
import { PedidoListaService } from './pedido-lista.service';

describe('PedidoListaController', () => {
  let controller: PedidoListaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PedidoListaController],
      providers: [PedidoListaService],
    }).compile();

    controller = module.get<PedidoListaController>(PedidoListaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
