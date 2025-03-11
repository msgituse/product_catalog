import useSWR from 'swr';
import { Product } from '@/types/types';

const fetcher = async (url: string) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error('Failed to fetch products');
  return response.json();
};

export function useProducts() {
  return useSWR<Product[]>(`${process.env.NEXT_PUBLIC_API_URL}/products`, fetcher);
}

export function useIsProductNameUnique() {
  const { data, error } = useSWR<Product[]>(`${process.env.NEXT_PUBLIC_API_URL}/products`, fetcher);
  const isUnique = (name: string) => {
    if (!data) return false;
    return !data.some((product:Product) => product.name.toLowerCase() === name.toLowerCase());
  };
  return { isUnique, isLoading: !data && !error, isError: !!error };
}