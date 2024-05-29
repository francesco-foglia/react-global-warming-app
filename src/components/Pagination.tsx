import { IconChevronsLeft, IconChevronLeft, IconChevronRight, IconChevronsRight } from '@tabler/icons-react';

interface Props {
  startIndex: number;
  setStartIndex: (startIndex: number) => void;
  endIndex: number;
  setEndIndex: (endIndex: number) => void;
  totalElements: number;
  numberElements: number;
}

function Pagination({ startIndex, setStartIndex, endIndex, setEndIndex, totalElements, numberElements }: Props) {
  const pageSize = numberElements;

  const goToPage = (newStartIndex: number) => {
    const newEndIndex = Math.min(newStartIndex + pageSize, totalElements);
    setStartIndex(newStartIndex);
    setEndIndex(newEndIndex);
  };

  const goToFirstPage = () => {
    goToPage(0);
  };

  const goToPreviousPage = () => {
    const newStartIndex = Math.max(startIndex - pageSize, 0);
    goToPage(newStartIndex);
  };

  const goToNextPage = () => {
    const newStartIndex = startIndex + pageSize;
    goToPage(newStartIndex);
  };

  const goToLastPage = () => {
    const newStartIndex = Math.floor((totalElements - 1) / pageSize) * pageSize;
    goToPage(newStartIndex);
  };

  return (
    <footer className="w-full flex flex-wrap justify-center items-center">
      <button
        onClick={goToFirstPage}
        disabled={startIndex === 0}
        className={`${startIndex === 0 ? "bg-gray-200" : "hover:bg-gray-200"} m-2 p-1 rounded transition-all duration-300`}
      >
        <IconChevronsLeft size={25} strokeWidth={1.5} className="text-gray-600" />
      </button>

      <button
        onClick={goToPreviousPage}
        disabled={startIndex === 0}
        className={`${startIndex === 0 ? "bg-gray-200" : "hover:bg-gray-200"} m-2 p-1 rounded transition-all duration-300`}
      >
        <IconChevronLeft size={25} strokeWidth={1.5} className="text-gray-600" />
      </button>

      <button
        onClick={goToNextPage}
        disabled={endIndex >= totalElements}
        className={`${endIndex >= totalElements ? "bg-gray-200" : "hover:bg-gray-200"} m-2 p-1 rounded transition-all duration-300`}
      >
        <IconChevronRight size={25} strokeWidth={1.5} className="text-gray-600" />
      </button>

      <button
        onClick={goToLastPage}
        disabled={endIndex >= totalElements}
        className={`${endIndex >= totalElements ? "bg-gray-200" : "hover:bg-gray-200"} m-2 p-1 rounded transition-all duration-300`}
      >
        <IconChevronsRight size={25} strokeWidth={1.5} className="text-gray-600" />
      </button>
    </footer>
  );
}

export default Pagination;
