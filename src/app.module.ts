import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProdutoModule } from './produto/produto.module';
import { Produto } from './produto/entities/produto.entity'

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'bancoteste.ct886ggck7q0.us-east-2.rds.amazonaws.com',
    port: 3306,
    database: 'meuprojetonest',
    username: 'admin',
    password: 'a4s5d6f1',
    autoLoadEntities: true,
    entities: [Produto],
    synchronize: true,  // Deixe como true para criar as tabelas automaticamente
    logging: true,  // Habilitar logging para depuração
  }), ProdutoModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
