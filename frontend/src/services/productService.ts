import { Product } from '@/types/types';

export async function deleteProduct(id: string) {
  await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${id}`, { method: 'DELETE' });
}

export async function createProduct(product: Product) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(product),
  });
  if (!response.ok) throw new Error('Failed to add product');
  return response.json();
}