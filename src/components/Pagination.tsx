import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";

export default function Pagination({
  handlePageChange,
  currentPage,
  totalPages,
}: {
  handlePageChange: (page: number) => void;
  currentPage: number;
  totalPages: number;
}) {
  if (totalPages < 1) return <></>;
  return (
    <div className="flex justify-end mt-4">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="mx-2 bg-indigo-600 p-2 rounded flex justify-center items-center"
      >
        <ChevronLeftIcon className="h-4 w-4 text-white" />
      </button>
      <span className="mx-2 flex items-center">
        Page {currentPage} of {totalPages}
      </span>
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="mx-2 bg-indigo-600 p-2 rounded flex justify-center items-center"
      >
        <ChevronRightIcon className="h-4 w-4 text-white" />
      </button>
    </div>
  );
}
