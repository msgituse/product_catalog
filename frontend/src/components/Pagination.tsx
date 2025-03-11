import { PaginationProps } from '@/types/types';

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  return (
    <div className="flex justify-center mt-6 gap-2">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`py-1 px-3 rounded border ${currentPage === 1 ? 'bg-gray-300' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
      >
        Prev
      </button>
      <span className="py-1 px-3 border rounded">{totalPages > 0 ? `Page ${currentPage} of ${totalPages}` : 'Page 0'}</span>
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages || totalPages === 0}
        className={`py-1 px-3 rounded border ${currentPage === totalPages || totalPages === 0 ? 'bg-gray-300' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
      >
        Next
      </button>
    </div>
  );
}