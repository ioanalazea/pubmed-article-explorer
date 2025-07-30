import { useEffect, useState } from "react";
// Import components
import { SearchFilter, Table } from "../components";
// Import types
import { Article } from "../types";
// Import utils
import { getAuthorNames } from "../utils/format";
import { filterTableData } from "../utils/filterTableData";

function ArticlePage() {
  const [initialArticles, setInitialArticles] = useState<Article[]>([]);
  const [articles, setArticles] = useState<Article[]>([]);

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [journal, setJournal] = useState("");
  const [appliedFilter, setAppliedFilter] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

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

        setInitialArticles(results);
      } catch (err) {
        console.log("Error");
      } finally {
        console.log("Worked!");
      }
    };

    fetchData();
  }, []);

  const applyFilters = () => {
    const filtered = filterTableData(initialArticles, {
      title,
      author,
      journal,
    });
    setArticles(filtered);
    setCurrentPage(1);
    if (title === "" && author === "" && journal === "")
      setAppliedFilter(false);
    else setAppliedFilter(true);
  };

  return (
    <div className="h-screen flex flex-col">
      <div className="bg-[#166088] text-white font-bold text-2xl p-6">
        PubMed Article Explorer
      </div>
      <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
        <div className="w-full md:w-1/3 bg-[#e1e1e166] p-4 overflow-y-auto">
          <SearchFilter
            title={title}
            setTitle={setTitle}
            author={author}
            setAuthor={setAuthor}
            journal={journal}
            setJournal={setJournal}
            appliedFilter={appliedFilter}
            setAppliedFilter={setAppliedFilter}
            onApply={applyFilters}
          />
        </div>
        <div className="w-full md:w-3/4 p-4 overflow-auto">
          <Table
            data={appliedFilter ? articles : initialArticles}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
      </div>
    </div>
  );
}

export { ArticlePage };
