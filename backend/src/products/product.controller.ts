import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  Param,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from './product.entity';
import { CreateProductDto } from './dto/create-product.dto';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async getAll(): Promise<Product[]> {
    return this.productService.findAll();
  }

  @Post()
  async create(@Body() productData: CreateProductDto): Promise<Product> {
    return this.productService.create(productData);
  }

  @Delete(':id')
  async remove(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<{ message: string }> {
    await this.productService.delete(id);
    return { message: 'Product deleted successfully' };
  }
}
