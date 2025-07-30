import { useState } from "react";
import { Article } from "../../types";
import { Summary } from "../Summary";

type TableProps = {
  data: Article[];
};

function Table({ data }: TableProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);

  const openSummary = (value: any) => {
    setSelectedArticle(value);
    setIsOpen(true);
  };

  const closeSummary = () => {
    setSelectedArticle(null);
    setIsOpen(false);
  };
  return (
    <div className="overflow-x-auto">
      <table className="table-auto border-gray-300">
        <thead>
          <tr className="bg-blue-200">
            <th className="px-4 py-2 font-bold text-black">Title</th>
            <th className="px-4 py-2 font-bold text-black">Authors</th>
            <th className="px-4 py-2 font-bold text-black">Journal</th>
            <th className="px-4 py-2 font-bold text-black">Year</th>
            <th className="px-4 py-2 font-bold text-black">DOI</th>
            <th className="px-4 py-2 font-bold text-black">Pages</th>
          </tr>
        </thead>
        <tbody>
          {data.map((value) => (
            <tr key={value.uid} onClick={() => openSummary(value)}>
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
