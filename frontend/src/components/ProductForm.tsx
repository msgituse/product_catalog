import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Product, ProductFormProps } from '@/types/types';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ProductForm({ onSubmit, initialData, isProductNameUnique  }: ProductFormProps) {
  const productSchema = z.object({
    name: z
      .string()
      .min(1, 'Product name is required')
      .refine(async (name:string) => {
        const isUnique = await isProductNameUnique(name);
        return isUnique;
      }, 'Product name already exists'),
    description: z.string().min(1, 'Description is required'),
    price: z.number().min(0.01, 'Price must be greater than 0'),
  });
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<Product>({
    resolver: zodResolver(productSchema),
    defaultValues: initialData || { name: '', description: '', price: 0 },
  });

  const [error, setError] = useState('');

  const onFormSubmit = async (data: Product) => {
    setError('');
    try {
      await onSubmit(data);
      toast.success(initialData ? 'Product updated successfully!' : 'Product added successfully!');
      reset(); // Reset form after submission
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
        toast.error(error.message);
      } else {
        setError('An unknown error occurred.');
        toast.error('An unknown error occurred.');
      }
    }
  };

  return (
    <div className="container mx-auto p-8 max-w-lg">
      <h1 className="text-2xl font-bold mb-6 text-center">{initialData ? 'Edit Product' : 'Add New Product'}</h1>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
        <div>
          <label className="block text-gray-700">Product Name</label>
          <input
            type="text"
            {...register('name')}
            className="w-full px-4 py-2 border rounded-md"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
        </div>
        <div>
          <label className="block text-gray-700">Description</label>
          <textarea
            {...register('description')}
            className="w-full px-4 py-2 border rounded-md"
          />
          {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
        </div>
        <div>
          <label className="block text-gray-700">Price</label>
          <input
            type="number"
            {...register('price', { valueAsNumber: true,
              required: "Price is required",
              min: { value: 0.01, message: "Price must be at least 0.01" }
            })}
            className="w-full px-4 py-2 border rounded-md"
          />
          {errors.price && <p className="text-red-500 text-sm">{errors.price.message}</p>}
        </div>
        <button
          type="submit"
          className={`w-full text-white py-2 px-4 rounded-md transition ${isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600'}`}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Processing...' : initialData ? 'Update Product' : 'Add Product'}
        </button>
      </form>
    </div>
  )
}