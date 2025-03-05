import { Controller, Get, Post, Body, Delete, Param } from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from './product.entity';

@Controller('products') // Define the API route for products
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  // Handle GET requests to retrieve all products
  @Get()
  getAll() {
    return this.productService.findAll();
  }

  // Handle POST requests to create a new product
  @Post()
  create(@Body() productData: Partial<Product>) {
    return this.productService.create(productData);
  }

  // Handle DELETE requests to remove a product by ID
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.delete(id);
  }
}
