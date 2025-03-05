'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';

type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
};

export default function ProductCatalog() {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [query, setQuery] = useState('');

  // Fetch products when the component mounts
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/products`);
        setAllProducts(response.data);
        setFilteredProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  // Handle search functionality
  const handleSearch = () => {
    const results = allProducts.filter((product) =>
      product.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredProducts(results);
  };

  // Handle deleting a product
  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/products/${id}`);
      const updatedProducts = allProducts.filter((product) => product.id !== id);
      setAllProducts(updatedProducts);
      setFilteredProducts(updatedProducts);
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-8 text-center">Product Catalog</h1>

      {/* Search & Add Button Row */}
      <div className="flex justify-between mb-4">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Search products..."
            className="border p-2 rounded"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            onClick={handleSearch}
            className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600"
          >
            Search
          </button>
        </div>
        <Link
          href="/add-product"
          className="bg-green-500 text-white py-1 px-3 rounded hover:bg-green-600"
        >
          Add New
        </Link>
      </div>

      {/* Table-like Grid Structure */}
      <div className="grid grid-cols-4 gap-4 border-b-2 pb-2 font-bold text-lg text-gray-700 bg-gray-200 p-4">
        <div>Product Name</div>
        <div>Description</div>
        <div>Price</div>
        <div className="text-center">Actions</div>
      </div>

      {/* Product Rows */}
      {filteredProducts.map((product) => (
        <div
          key={product.id}
          className="grid grid-cols-4 gap-4 border-b p-4 items-center"
        >
          <div className="font-semibold">{product.name}</div>
          <div className="text-gray-600">{product.description}</div>
          <div className="font-bold">${product.price.toFixed(2)}</div>

          <div className="flex justify-center gap-2">
            <button
              onClick={() => handleDelete(product.id)}
              className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}