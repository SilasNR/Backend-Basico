import { Test, TestingModule } from '@nestjs/testing';
import { TransportadoraController } from './transportadora.controller';
import { TransportadoraService } from './transportadora.service';

describe('TransportadoraController', () => {
  let controller: TransportadoraController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TransportadoraController],
      providers: [TransportadoraService],
    }).compile();

    controller = module.get<TransportadoraController>(TransportadoraController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
