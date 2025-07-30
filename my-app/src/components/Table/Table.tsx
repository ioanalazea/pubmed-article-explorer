import { useState } from "react";
import { Article } from "../../types";
import { Summary } from "../Summary";

type TableProps = {
  data: Article[];
};

const ITEMS_PER_PAGE = 10;

function Table({ data }: TableProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(data.length / ITEMS_PER_PAGE);
  const paginatedData = data.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const openSummary = (value: any) => {
    setSelectedArticle(value);
    setIsOpen(true);
  };

  const closeSummary = () => {
    setSelectedArticle(null);
    setIsOpen(false);
  };

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };
  return (
    <div className="overflow-x-auto">
      <table className="table-auto border-gray-300">
        <thead>
          <tr className="bg-[#166088]">
            <th className="px-4 py-2 font-bold text-white">Title</th>
            <th className="px-4 py-2 font-bold text-white">Authors</th>
            <th className="px-4 py-2 font-bold text-white">Journal</th>
            <th className="px-4 py-2 font-bold text-white">Year</th>
            <th className="px-4 py-2 font-bold text-white">DOI</th>
            <th className="px-4 py-2 font-bold text-white">Pages</th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((value, index) => (
            <tr
              className={index % 2 === 0 ? "bg-[#DBE9EE]" : "bg-[#C0D6DF]"}
              key={value.uid}
              onClick={() => openSummary(value)}
            >
              <td className="px-4 py-2">{value.title}</td>
              <td className="px-4 py-2">{value.authors}</td>
              <td className="px-4 py-2">{value.journal}</td>
              <td className="px-4 py-2">{value.year}</td>
              <td className="px-4 py-2">{value.doi}</td>
              <td className="px-4 py-2">{value.pages}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-center mt-4 space-x-2">
        <button
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous page
        </button>

        <button
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next Page
        </button>
      </div>
      {isOpen && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={closeSummary}
          ></div>
          <Summary article={selectedArticle} close={closeSummary} />
        </>
      )}
    </div>
  );
}

export { Table };
