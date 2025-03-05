import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepo: Repository<Product>, // Inject the Product repository
  ) {}

  // Get all products from the database
  findAll() {
    return this.productRepo.find();
  }

  // Create a new product
  create(productData: Partial<Product>) {
    const product = this.productRepo.create(productData);
    return this.productRepo.save(product);
  }

  // Delete a product by its ID
  delete(id: string) {
    return this.productRepo.delete(id);
  }
}
