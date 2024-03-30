import { BadRequestException, Inject, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationDto } from 'src/common/dtos/paginations.dto';
import { validate as isUUID } from 'uuid';
@Injectable()
export class ProductsService {

  private readonly logger = new Logger('ProductsService');
  constructor(

    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) { }

  async create(input: CreateProductDto) {
    try {
      // if (!input.slug) { //TODO: se puede hacer directamente en entities de
      //   input.slug = input.title
      //     .toLowerCase()
      //     .replaceAll(' ', '_')
      //     .replaceAll("'", '')
      // }else {
      //   input.slug = input.slug
      //   .toLowerCase()
      //   .replaceAll(' ','_')
      //   .replaceAll("'", '')
      // }

      const product = this.productRepository.create(input); //Crea el producto

      await this.productRepository.save(product); //Guarda el producto

      return product; //Retorna el producto (visual)

    } catch (err) {
      this.handleExceptions(err)
    }

  }

  //TODO:paginar
  findAll(pagination: PaginationDto) {
    try {
      const { limit = 10, offset = 0 } = pagination

      return this.productRepository.find({
        take: limit,
        skip: offset,
        //TODO: relaciones
      })

    } catch (err) {
      this.handleExceptions(err)
    }
  }




  async findOne(term: string) {
    try {
      let product: Product;

      if (isUUID(term)) {
        product = await this.productRepository.findOneBy({ id: term });
      } else {
        const queryBuilder = this.productRepository.createQueryBuilder();
        product = await queryBuilder
          .where('UPPER(title) =:title or slug =:slug', {
            title: term.toUpperCase(),
            slug: term.toLowerCase(),
          }).getOne();
      }
    }

    catch (err) {
      throw new BadRequestException(`Product with id ${term} not found`);
    }




  }



  private async findOneDelet(id: string) {


    try {
      const product = await this.productRepository.findOneBy({ id: id });
      return product;
    } catch (err) {
      throw new BadRequestException(`Product with id ${id} not found`);
    }

  }

  async update(id: string, updateProductDto: UpdateProductDto) {

    try {
      const product = await this.productRepository.preload({
        id: id,
        ...updateProductDto
      })
      if ( !product ) throw new BadRequestException(`Product with id ${id} not found`);
      await this.productRepository.save( product )
      return product;

    } catch (err) {
      throw new BadRequestException(err);
    }

    return;
  }

  async remove(id: string) {
    const product = await this.findOneDelet(id)
    await this.productRepository.remove(product)
  }


  private handleExceptions(err: any) {
    this.logger.error(err)
    throw new BadRequestException(err.detail);
  }
}
