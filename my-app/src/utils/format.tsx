type Author = { name: string; authtype: string; clusterid: string };

export function getAuthorNames(authors: Author[] | undefined): string {
  if (!authors || authors.length === 0) return "Unknown";
  return authors.map((a) => a.name).join(", ");
}
