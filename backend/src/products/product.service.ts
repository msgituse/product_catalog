import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>, // Inject the Product repository
  ) {}

  // Get all products from the database
  async findAll(): Promise<Product[]> {
    return this.productRepo.find();
  }

  // Create a new product
  async create(productData: CreateProductDto): Promise<Product> {
    const product = this.productRepo.create(productData);
    return this.productRepo.save(product);
  }

  // Find product by ID (helper method)
  async findById(id: string): Promise<Product> {
    const product = await this.productRepo.findOne({ where: { id } });
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return product;
  }

  // Delete a product by its ID
  async delete(id: string): Promise<{ message: string }> {
    await this.findById(id); // Ensure product exists before deleting
    await this.productRepo.delete(id);
    return { message: 'Product deleted successfully' };
  }
}
