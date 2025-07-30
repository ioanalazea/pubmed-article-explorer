import { useMemo, useState } from "react";
import { Article } from "../types";
import { filterTableData } from "../utils/filterTableData";

export const useTableFilter = (initialData: Article[]) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [journal, setJournal] = useState("");

  const filteredData = useMemo(() => {
    return filterTableData(initialData, { title, author, journal });
  }, [initialData, title, author, journal]);

  return {
    title,
    setTitle,
    author,
    setAuthor,
    journal,
    setJournal,
    filteredData,
  };
};
