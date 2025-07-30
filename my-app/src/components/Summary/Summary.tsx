import { useEffect, useState } from "react";
import { Article } from "../../types";

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
      <div className="p-5 flex items-center">
        <h2>{article?.title}</h2>
        <button onClick={close}>Close</button>
      </div>
      <div className="p-6">
        <p>Authors: {article?.authors}</p>
        <p>Journal: {article?.journal}</p>
        <p>Year: {article?.year}</p>
        <p>DOI: {article?.doi}</p>
        <p>Pages: {article?.pages}</p>
      </div>
      <div className="p-4">
        <h3>Abstract</h3>
        <p>{abstract}</p>
      </div>
    </div>
  );
}

export { Summary };
