// PUBMED API
// Import types;
import { Article } from "../types";
// Import utils:
import { getAuthorNames } from "../utils/format";

// GET articles related to AI in healthcare
export const getArticles = async (): Promise<Article[]> => {
  try {
    const idsRes = await fetch(
      "https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=pubmed&term=artificial+intelligence+in+healthcare&retmode=json&retstart=0&retmax=30"
    );
    const json = await idsRes.json();
    const ids: string[] = json.esearchresult.idlist;

    if (ids.length === 0) return [];

    const articlesRes = await fetch(
      `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi?db=pubmed&id=${ids.join(
        ","
      )}&retmode=json`
    );

    const articlesJson = await articlesRes.json();

    return ids.map((uid) => {
      const article = articlesJson.result[uid];
      return {
        uid: article.uid,
        title: article.title,
        authors: getAuthorNames(article.authors),
        journal: article.fulljournalname,
        year: article.pubdate,
        doi: article.elocationid,
        pages: article.pages,
      };
    });
  } catch (error) {
    console.error("Error getting articles:", error);
    return [];
  }
};

// GET abstract by article uid
export const getAbstract = async (uid: string): Promise<string> => {
  try {
    const res = await fetch(
      `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&id=${uid}&retmode=json&rettype=abstract`
    );
    const text = await res.text();
    return text;
  } catch (err) {
    console.error("Error getting abstract:", err);
    return "Error getting the abstract.";
  }
};
