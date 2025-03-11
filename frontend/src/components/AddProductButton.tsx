import Link from 'next/link';

export const AddProductButton = () => (
  <Link href="/add-product" className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition duration-200">
    Add New Product
  </Link>
)