import { useEffect, useState } from "react";
// Import components
import { Button, Input, Table } from "../components";
// Import types
import { Article } from "../types";
// Import utils
import { getAuthorNames } from "../utils/format";

function ArticlePage() {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const idsRes = await fetch(
          "https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=pubmed&term=artificial+intelligence+in+healthcare&retmode=json&retmax=20"
        );
        const json = await idsRes.json();
        const ids: string[] = json.esearchresult.idlist;
        if (ids.length === 0) return;

        const articlesRes = await fetch(
          `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi?db=pubmed&id=${ids.join(
            ","
          )}&retmode=json`
        );

        const articlesJson = await articlesRes.json();

        const results = ids.map((uid) => {
          const article = articlesJson.result[uid];
          return {
            uid: article.uid,
            title: article.title,
            authors: getAuthorNames(article.authors),
            journal: article.fulljournalname,
            year: article.pubdate,
            doi: article.elocationid,
            pages: article.pages,
          };
        });

        setArticles(results);
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
      <div className="bg-[#166088] text-white font-bold text-2xl p-4">
        PubMed Article Explorer
      </div>
      <div>
        <Input label="Title" />
        <Input label="Author" />
        <Input label="Journal" />
        <Button text="Apply filters" className="m-4"/>
      </div>
      <Table data={articles} />
    </div>
  );
}

export { ArticlePage };
