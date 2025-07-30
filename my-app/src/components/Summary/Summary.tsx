//Import components:
import { Button } from "../UI";
// Import types:
import { Article } from "../../types";
import { extractYear, removeDoi } from "../../utils/format";

type SummaryProps = {
  article: Article | null;
  abstract: string;
  close: () => void;
};
function Summary({ article, abstract, close }: SummaryProps) {
  return (
    <div className="fixed top-0 right-0 h-full md:w-1/2 bg-white shadow-lg z-50 transition-all duration-300 p-2">
      <div className="p-4 space-x-4 flex items-center bg-[#4f6d7a44] rounded-md justify-between">
        <p className="text-xl font-bold text-left">{article?.title}</p>
        <Button onClick={close} text={"Close"} />
      </div>
      <div className="p-4 space-y-1">
        <p className="text-sm">
          <b>Authors:</b> {article?.authors}
        </p>
        <p className="text-sm">
          <b>Journal:</b> {article?.journal}
        </p>
        <p className="text-sm">
          <b>Year:</b> {extractYear(article?.year ?? "")}
        </p>
        <p className="text-sm">
          <b>DOI:</b> {removeDoi(article?.doi ?? "")}
        </p>
        <p className="text-sm">
          <b>Pages:</b> {article?.pages}
        </p>
      </div>
      <div className="p-4 flex flex-col">
        <p className="text-lg font-medium mb-1">Abstract</p>
        <div className="text-sm max-h-80 overflow-y-auto text-justify">
          {abstract}
        </div>
      </div>
    </div>
  );
}

export { Summary };
