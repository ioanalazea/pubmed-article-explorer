// Import components:
import { Button, Input } from "../UI";

type SearchFilterProps = {
  title: string;
  setTitle: (val: string) => void;
  author: string;
  setAuthor: (val: string) => void;
  journal: string;
  setJournal: (val: string) => void;
  year: string;
  setYear: (val: string) => void;
  appliedFilter: boolean;
  setAppliedFilter: (val: boolean) => void;
  onApply: () => void;
};

function SearchFilter({
  title,
  setTitle,
  author,
  setAuthor,
  journal,
  setJournal,
  year,
  setYear,
  appliedFilter,
  setAppliedFilter,
  onApply,
}: SearchFilterProps) {
  const removeFilters = () => {
    setAppliedFilter(false);
    setAuthor("");
    setTitle("");
    setJournal("");
    setYear("");
  };
  return (
    <div className="md:p-4 space-y-4 text-xs">
      <div className="grid grid-cols-2 md:grid-cols-1 gap-1">
        <Input
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Input
          label="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        <Input
          label="Journal"
          value={journal}
          onChange={(e) => setJournal(e.target.value)}
        />
        <Input
          label="Year"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        />
      </div>
      <Button text="Apply filters" onClick={onApply} className="m-4" />
      {appliedFilter && (
        <Button
          text="Remove"
          onClick={removeFilters}
          className="m-4 bg-[#cc6d6d] hover:bg-[#a85959] transition-colors duration-200"
        />
      )}
    </div>
  );
}

export { SearchFilter };
