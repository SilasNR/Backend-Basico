import { Test, TestingModule } from '@nestjs/testing';
import { PedidoListaService } from './pedido-lista.service';

describe('PedidoListaService', () => {
  let service: PedidoListaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PedidoListaService],
    }).compile();

    service = module.get<PedidoListaService>(PedidoListaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
