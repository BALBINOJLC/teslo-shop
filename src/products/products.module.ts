import { TypeOrmModule } from '@nestjs/typeorm';

import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { Product } from './entities/product.entity';

@Module({
  controllers: [ProductsController],
  imports: [
TypeOrmModule.forFeature([
  Product  //Agregamos el TypeOrmModule.forFeature() para importar la entidad Product 
]),
  ],
  providers: [ProductsService],
})
export class ProductsModule {}
