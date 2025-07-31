import { useState } from "react";
// Import components:
import { Summary } from "../Summary";
import { Button } from "../UI";
// Import utils:
import { extractYear, removeDoi, truncateText } from "../../utils/format";
// Import types:
import { Article } from "../../types";
// Import api:
import { getAbstract } from "../../api/pubmed";

type TableProps = {
  data: Article[];
  currentPage: number;
  setCurrentPage: (val: number) => void;
};

const ITEMS_PER_PAGE = 10;

function Table({ data, currentPage, setCurrentPage }: TableProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [abstract, setAbstract] = useState("");

  const totalPages = Math.ceil(data.length / ITEMS_PER_PAGE);
  const paginatedData = data.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const openSummary = async (value: Article) => {
    const text = await getAbstract(value.uid);
    setAbstract(text);
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
    <div>
      <div className="md:max-h-[80vh] md:overflow-y-auto">
        <table className="table-auto border-gray-300 text-xs w-full">
          <thead>
            <tr className="bg-[#166088] sticky top-0 z-10">
              <th className="px-4 py-2 font-bold text-white">Title</th>
              <th className="px-4 py-2 font-bold text-white">Authors</th>
              <th className="px-4 py-2 font-bold text-white">Journal</th>
              <th className="px-4 py-2 font-bold text-white">Year</th>
              <th className="px-4 py-2 font-bold text-white">DOI</th>
              <th className="px-4 py-2 font-bold text-white">Pages</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.length === 0 && (
              <tr>
                <td colSpan={6} className="text-center py-4 text-gray-500">
                  No articles found.
                </td>
              </tr>
            )}
            {paginatedData.map((value, index) => (
              <tr
                className={`hover:bg-gray-100 hover:text-[#166088]  cursor-pointer ${
                  index % 2 === 0 ? "bg-[#dbe9eec1]" : "bg-[#c0d6dfdb]"
                }`}
                key={value.uid}
                onClick={() => openSummary(value)}
              >
                <td className="px-4 py-2 font-medium">{value.title}</td>
                <td className="px-4 py-2">{truncateText(value.authors, 30)}</td>
                <td className="px-4 py-2">{value.journal}</td>
                <td className="px-4 py-2">{extractYear(value.year)}</td>
                <td className="px-4 py-2">{removeDoi(value.doi)}</td>
                <td className="px-4 py-2">{value.pages}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center mt-3 space-x-3">
        <div className="text-sm text-gray-700 p-1">
          Page <b>{currentPage}</b> of {totalPages}
        </div>
        <Button
          className="text-xs"
          text="Previous page"
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
        />

        <Button
          className="text-xs"
          text="Next Page"
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
        />
      </div>
      {isOpen && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={closeSummary}
          ></div>
          <Summary
            article={selectedArticle}
            abstract={abstract}
            close={closeSummary}
          />
        </>
      )}
    </div>
  );
}

export { Table };
