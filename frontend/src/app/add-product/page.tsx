'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation'; // Import from 'next/navigation' in the App Router
import axios from 'axios';

export default function AddProduct() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [error, setError] = useState('');
  const router = useRouter(); // Use useRouter from 'next/navigation'

  // Handle form submission
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!name || !description || price <= 0) {
      setError('Please fill in all fields correctly.');
      return;
    }

    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/products`, {
        name,
        description,
        price,
      });

      // Redirect to the product catalog after adding
      router.push('/product-catalog');
    } catch (error) {
      setError('Error adding product, please try again.');
      console.error('Error adding product:', error);
    }
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPrice(value === "" ? 0 : Number(value) || 0);
  };
  
  

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-8 text-center">Add New Product</h1>

      {error && <div className="text-red-500 text-center mb-4">{error}</div>}

      <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700">Product Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border rounded-md"
            placeholder="Enter product name"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="description" className="block text-gray-700">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-2 border rounded-md"
            placeholder="Enter product description"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="price" className="block text-gray-700">Price</label>
          <input
            type="number"
            id="price"
            value={isNaN(price) ? "" : price} 
            onChange={handlePriceChange}
            className="w-full px-4 py-2 border rounded-md"
            placeholder="Enter product price"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600"
        >
          Add Product
        </button>
      </form>
    </div>
  );
}