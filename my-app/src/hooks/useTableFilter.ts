import { useMemo, useState } from "react";
import { Article } from "../types";
import { filterTableData } from "../utils/filterTableData";

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
