'use client';
import { useRouter } from 'next/navigation';
import ProductForm from '@/components/ProductForm';
import { createProduct } from '@/services/productService';
import { Product } from '@/types/types';
import { useIsProductNameUnique } from '@/hooks/useProducts';

export default function AddProduct() {
  const router = useRouter();
  const { isUnique } = useIsProductNameUnique();

  const handleSubmit = async (formData: Product) => {
    await createProduct(formData);
    router.push('/product-catalog');
  };

  const checkProductNameUnique = async (name: string) => {
    return isUnique(name);
  };


  return <ProductForm onSubmit={handleSubmit} isProductNameUnique={checkProductNameUnique}  />;
}