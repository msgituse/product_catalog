'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useProducts } from '@/hooks/useProducts';
import ProductList from '@/components/ProductList';
import Pagination from '@/components/Pagination';
import SearchBar from '@/components/SearchBar';
import { deleteProduct } from '@/services/productService';
import { Loader } from 'lucide-react';
import { ITEMS_PER_PAGE } from '@/constants/config';

export default function ProductCatalog() {
  const { data: products, error, mutate } = useProducts();
  const [query, setQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  if (error) return <p className="text-red-500 text-center">Failed to load products.</p>;

  if (!products) {
    return (
      <div className="flex justify-center items-center h-40">
        <Loader className="animate-spin text-gray-600" size={32} />
      </div>
    );
  }

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(query.toLowerCase())
  );
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleDelete = async (id: string) => {
    await deleteProduct(id);
    mutate();
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Product Catalog</h1>
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <SearchBar query={query} onQueryChange={setQuery} />
        <Link
          href="/add-product"
          className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition duration-200"
        >
          Add New Product
        </Link>
      </div>
      <ProductList products={paginatedProducts} onDelete={handleDelete} />
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
    </div>
  );
}