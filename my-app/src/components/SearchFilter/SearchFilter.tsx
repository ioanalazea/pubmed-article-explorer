import { Button, Input } from "../UI";

type SearchFilterProps = {
  title: string;
  setTitle: (val: string) => void;
  author: string;
  setAuthor: (val: string) => void;
  journal: string;
  setJournal: (val: string) => void;
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
  appliedFilter,
  setAppliedFilter,
  onApply,
}: SearchFilterProps) {
  const removeFilters = () => {
    setAppliedFilter(false);
    setAuthor("");
    setTitle("");
    setJournal("");
  };
  return (
    <div className="p-4 space-y-4 text-xs">
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
      <Button text="Apply filters" onClick={onApply} className="m-4" />
      {appliedFilter && (
        <Button text="Remove" onClick={removeFilters} className="m-4" />
      )}
    </div>
  );
}

export { SearchFilter };
