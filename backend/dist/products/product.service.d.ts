import { Repository } from 'typeorm';
import { Product } from './product.entity';
export declare class ProductService {
    private productRepo;
    constructor(productRepo: Repository<Product>);
    findAll(): Promise<Product[]>;
    create(productData: Partial<Product>): Promise<Product>;
    delete(id: string): Promise<import("typeorm").DeleteResult>;
}
