type Author = { name: string; authtype: string; clusterid: string };

export function getAuthorNames(authors: Author[] | undefined): string {
  if (!authors || authors.length === 0) return "Unknown";
  return authors.map((a) => a.name).join(", ");
}

export function removeDoi(text: string): string {
  return text.replace("doi:", "").trim();
}

export function extractYear(text: string): string {
  const match = text.match(/\b\d{4}\b/g);;
  return match ? match[0] : "No year found";
}

export const truncateText = (str: string, maxLen: number) =>
  str.length > maxLen ? str.slice(0, maxLen) + "..." : str;
