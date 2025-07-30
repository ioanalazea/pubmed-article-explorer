import { useEffect, useState } from "react";
// Import components
import { SearchFilter, Table } from "../components";
// Import API:
import { getArticles } from "../api/pubmed";
// Import types
import { Article } from "../types";
// Import utils
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
    const loadArticles = async () => {
      const results = await getArticles();
      setInitialArticles(results);
    };
    loadArticles();
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
      <div className="bg-[#166088] text-white font-bold text-2xl p-4">
        PubMed Article Explorer
      </div>
      <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
        <div className="w-full md:w-1/3 bg-[#e1e1e135] md:p-4 pb-2">
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
        <div className="w-full md:w-3/4 md:p-4 overflow-auto mt-2 md:mt-0 pb-2">
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
