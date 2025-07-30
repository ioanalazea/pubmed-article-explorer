import { useEffect, useState } from "react";
// Import components
import { Table } from "../components";
// Import types
import { Article } from "../types";
// Import utils
import { getAuthorNames } from "../utils/format";

function ArticlePage() {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          "https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=pubmed&term=artificial+intelligence+in+healthcare&retmode=json&retmax=1"
        );
        const json = await res.json();
        json.esearchresult.idlist.forEach(async (uid: any) => {
          const res = await fetch(
            `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi?db=pubmed&id=40642746&retmode=json`
          );

          const json = await res.json();
          const article = json.result["40642746"]; // CHANGE HERE WITH UID LATER
          const newArticle: Article = {
            uid: article.uid,
            title: article.title,
            authors: getAuthorNames(article.authors),
            journal: article.fulljournalname,
            year: article.pubdate,
            doi: article.elocationid,
            pages: article.pages,
          };
          if (newArticle) setArticles([...articles, newArticle]);
        });
      } catch (err) {
        console.log("Error");
      } finally {
        console.log("Worked!");
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <div className="bg-[#74B3CE] text-white font-bold text-2xl p-4">
        PubMed Article Explorer
      </div>
      <Table data={articles} />
    </div>
  );
}

export { ArticlePage };
