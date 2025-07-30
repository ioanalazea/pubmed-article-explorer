import { Article } from "../types";

type FilterProps = {
  title: string;
  author: string;
  journal: string;
};

export const filterTableData = (
  data: Article[],
  filters: FilterProps
): Article[] => {
  const { title, author, journal } = filters;
  return data.filter((value) => {
    const matchesTitle = title
      ? value.title.toLowerCase().includes(title.toLowerCase())
      : true;
    const matchesAuthor = author
      ? value.authors.toLowerCase().includes(author.toLowerCase())
      : true;
    const matchesJournal = journal
      ? value.journal.toLowerCase().includes(journal.toLowerCase())
      : true;

    return matchesTitle && matchesAuthor && matchesJournal;
  });
};
