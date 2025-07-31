import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { ArticlePage } from "../pages";
import { getArticles } from "../api/pubmed";

// Components mocking
jest.mock("../components", () => ({
  SearchFilter: ({ onApply }: any) => (
    <div>
      <button onClick={onApply}>Apply Filters</button>
    </div>
  ),
  Table: ({ data }: any) => (
    <div data-testid="table">Table with {data.length} rows</div>
  ),
}));

// API mocking
jest.mock("../api/pubmed", () => ({
  getArticles: jest.fn(),
}));

describe("ArticlePage", () => {
  const mockArticles = [
    {
      uid: "123",
      title: "Test",
      authors: "John Doe",
      journal: "Nature",
      year: "2025",
      doi: "12454224",
      pages: "134",
    },
  ];
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("fetches and displays articles in table", async () => {
    (getArticles as jest.Mock).mockResolvedValue(mockArticles);
    render(<ArticlePage />);
    await waitFor(() => screen.getByTestId("table"));
    expect(screen.getByText(/Table with 1 rows/i)).toBeInTheDocument();
  });
  
  it("applies filters when button is clicked", async () => {
    (getArticles as jest.Mock).mockResolvedValue(mockArticles);
    render(<ArticlePage />);
    await waitFor(() => screen.getByTestId("table"));
    fireEvent.click(screen.getByText(/Apply Filters/i));
    expect(screen.getByText(/Table with 1 rows/i)).toBeInTheDocument();
  });
});
