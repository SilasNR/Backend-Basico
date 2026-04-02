import { Test, TestingModule } from '@nestjs/testing';
import { TransportadoraService } from './transportadora.service';

describe('TransportadoraService', () => {
  let service: TransportadoraService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TransportadoraService],
    }).compile();

    service = module.get<TransportadoraService>(TransportadoraService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
