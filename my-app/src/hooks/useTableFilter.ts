import { useMemo, useState } from "react";
// Import utils:
import { filterTableData } from "../utils/filterTableData";
// Import types:
import { Article } from "../types";

export const useTableFilter = (initialData: Article[]) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [journal, setJournal] = useState("");
  const [year, setYear] =useState("")

  const filteredData = useMemo(() => {
    return filterTableData(initialData, { title, author, journal, year });
  }, [initialData, title, author, journal, year]);

  return {
    title,
    setTitle,
    author,
    setAuthor,
    journal,
    setJournal,
    year,
    setYear,
    filteredData,
  };
};
