import { Article } from "../../types";

type TableProps = {
  data: Article[];
};

export const Table: React.FC<TableProps> = ({ data }) => {
    console.log("DATA", data)
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
            <tr key={value.uid}>
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
    </div>
  );
};
