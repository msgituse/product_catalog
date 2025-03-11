import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'products' }) // Explicit table name for clarity
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 }) // Better precision for financial data
  price: number;

  @Column({ type: 'text', nullable: true })
  description?: string;
}
