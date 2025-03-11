import { useState } from 'react';
import { Trash2 } from 'lucide-react';
import { ProductItemProps } from '@/types/types';

export const ProductItem: React.FC<ProductItemProps> = ({ product, handleDelete }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const confirmDelete = () => {
    if (product?.id) {
      handleDelete(product.id);
      setIsModalOpen(false);
    } else {
      console.error("Error: Product ID is missing.");
    }
  };
  return (
    <>
      <div className="grid grid-cols-4 border-b p-4 items-center hover:bg-gray-100 transition">
        <div className="font-semibold text-left">{product.name}</div>
        <div className="text-gray-600 truncate text-left">{product.description}</div>
        <div className="font-bold text-left">${Number(product.price).toFixed(2)}</div>
        <div className="flex justify-center">
          <button 
            onClick={() => setIsModalOpen(true)} 
            className="text-red-500 hover:text-red-600 transition"
            aria-label="Delete product"
          >
            <Trash2 size={20} />
          </button>
        </div>
      </div>
      {/* Delete Confirmation Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <h2 className="text-lg font-semibold mb-2">Are you sure?</h2>
            <p className="text-gray-600 mb-4">
              Do you really want to delete <strong>{product.name}</strong>? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-2">
              <button 
                onClick={() => setIsModalOpen(false)} 
                className="px-4 py-2 text-gray-600 border rounded hover:bg-gray-100"
              >
                Cancel
              </button>
              <button 
                onClick={confirmDelete} 
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}