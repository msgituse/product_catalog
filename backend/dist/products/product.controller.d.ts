import { ProductService } from './product.service';
import { Product } from './product.entity';
export declare class ProductController {
    private readonly productService;
    constructor(productService: ProductService);
    getAll(): Promise<Product[]>;
    create(productData: Partial<Product>): Promise<Product>;
    remove(id: string): Promise<import("typeorm").DeleteResult>;
}
