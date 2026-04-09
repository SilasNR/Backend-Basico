import { PartialType } from '@nestjs/mapped-types';
import { CreateRegiaoDto } from './create-regiao.dto'

export class UpdateEstadoDto extends PartialType(CreateRegiaoDto) { }
