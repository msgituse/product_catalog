export interface Product {
  id?: string;
  name: string;
  description: string;
  price: number;
}

export interface ProductListProps {
  products: Product[];
  onDelete: (id: string) => void;
}

export interface SearchBarProps {
  query: string;
  onQueryChange: (query: string) => void;
}

export interface ProductItemProps {
  product: Product;
  handleDelete: (id: string) => void;
}

export interface ProductFormProps {
  onSubmit: (formData: Product) => Promise<void>;
  initialData?: Product;
  isProductNameUnique: (name: string) => Promise<boolean>;
}

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}