import { ProductItem } from '@/components/ProductItem';
import { Product,  ProductListProps} from '@/types/types';

export default function ProductList({ products, onDelete }: ProductListProps) {
  return (
    <div className="overflow-x-auto">
      <div className="border border-gray-300 shadow-lg rounded-lg">
        {/* Table Header */}
        <div className="grid grid-cols-4 bg-gray-100 p-4 font-semibold">
          <div className="px-4 py-2 text-left">Name</div>
          <div className="px-4 py-2 text-left">Description</div>
          <div className="px-4 py-2 text-left">Price</div>
          <div className="px-4 py-2 text-center">Actions</div>
        </div>
        {/* Table Body */}
        <div>
          {products.length > 0 ? (
            products.map((product: Product) => (
              <ProductItem key={product.id} product={product} handleDelete={onDelete} />
            ))
          ) : (
            <p className="text-center text-gray-500 p-4">No products found.</p>
          )}
        </div>
      </div>
    </div>
  )
}