import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProdutoService } from './produto.service';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';

@Controller('produtos')
export class ProdutoController {
  constructor(private readonly produtoService: ProdutoService) { }

  // @Post()
  // create(@Body() body: { codigo: string; observacao: string; quantidade: number; pacote: number; caixa: number}) {
  //   console.log(body);
  //   return this.produtoService.create(body);
  // }

  @Post()
  create(@Body() createProdutoDto: CreateProdutoDto) {
    console.log(createProdutoDto);
    return this.produtoService.create(createProdutoDto);
  }

  @Get()
  findAll() {
    return this.produtoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.produtoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProdutoDto: UpdateProdutoDto) {
    return this.produtoService.update(+id, updateProdutoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.produtoService.remove(+id);
  }

  @Post('delete-many')
  async removeMany(@Body() ids: number[]) {
    console.log('IDs recebidos para deletar:', ids);
    return this.produtoService.removeMany(ids);
  }

  // @Delete('delete-many')
  // async removeMany(@Body() ids: number[]) {
  //   return this.produtoService.removeMany(ids);
  // }
}
