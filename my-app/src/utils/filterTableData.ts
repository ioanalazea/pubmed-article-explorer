import { Article } from "../types";

type FilterProps = {
  title: string;
  author: string;
  journal: string;
  year: string;
};

export const filterTableData = (
  data: Article[],
  filters: FilterProps
): Article[] => {
  const { title, author, journal, year } = filters;
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
    const matchesYear = year ? value.year.startsWith(year) : true;
    return matchesTitle && matchesAuthor && matchesJournal && matchesYear;
  });
};
