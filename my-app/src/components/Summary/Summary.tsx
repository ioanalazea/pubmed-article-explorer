import { useEffect, useState } from "react";
//Import components:
import { Button } from "../UI";
// Import types:
import { Article } from "../../types";
import { extractYear, removeDoi } from "../../utils/format";
// Import utils:

type SummaryProps = {
  article: Article | null;
  close: () => void;
};
function Summary({ article, close }: SummaryProps) {
  const [abstract, setAbstract] = useState("");
  const getAbstract = async () => {
    try {
      const res = await fetch(
        `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&id=${article?.uid}&retmode=json&rettype=abstract`
      );
      const text = await res.text();
      setAbstract(text);
    } catch (err) {
      console.log("Error getting abstract.");
    }
  };

  useEffect(() => {
    getAbstract();
  });

  return (
    <div className="fixed top-0 right-0 h-full w-1/2 bg-white shadow-lg z-50 transition-all duration-300">
      <div className="p-4 flex items-center">
        <p className="text-xl font-bold">{article?.title}</p>
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
      <div className="p-4">
        <p className="text-lg font-medium">Abstract</p>
        <p className="text-sm overflow-y">{abstract}</p>
      </div>
    </div>
  );
}

export { Summary };
