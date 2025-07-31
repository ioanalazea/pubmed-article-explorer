// PUBMED API
// Import types;
import { Article } from "../types";
// Import utils:
import { getAuthorNames } from "../utils/format";

const API_KEY = process.env.REACT_APP_PUBMED_API_KEY;
const BATCH_SIZE = 50;
const REQUEST_DELAY_MS = 350;
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// GET articles related to AI in healthcare
export const getArticles = async (): Promise<Article[]> => {
  try {
    const idsRes = await fetch(
      `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=pubmed&term=artificial+intelligence+in+healthcare&retmode=json&retstart=0&retmax=50&api_key=${API_KEY}`
    );
    const json = await idsRes.json();
    const ids: string[] = json.esearchresult.idlist;

    if (ids.length === 0) return [];

    const articlesRes = await fetch(
      `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi?db=pubmed&id=${ids.join(
        ","
      )}&retmode=json&api_key=${API_KEY}`
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

// GET articles in BATCHES
export const getArticlesBatch = async (
  onBatchUpdate: (batch: Article[], isLastBatch: boolean) => void
): Promise<void> => {
  try {
    const countRes = await fetch(
      `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=pubmed&term=artificial+intelligence+in+healthcare&retmode=json&retstart=0&retmax=30&api_key=${API_KEY}`
    );

    const countJson = await countRes.json();
    // const total = parseInt(countJson.esearchresult.count, 10);
    const total = 300;
    const allIds = new Set<string>();
    for (let start = 0; start < total; start += BATCH_SIZE) {
      const idsRes = await fetch(
        `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=pubmed&term=artificial+intelligence+in+healthcare&retmode=json&retstart=${start}&retmax=${BATCH_SIZE}&api_key=${API_KEY}`
      );
      const idsJson = await idsRes.json();
      idsJson.esearchresult.idlist.forEach((id: string) => allIds.add(id));
      await sleep(REQUEST_DELAY_MS);
    }

    const allIdsArray = Array.from(allIds);
    let articles: Article[] = [];
    for (let i = 0; i < allIdsArray.length; i += BATCH_SIZE) {
      const idsBatch = allIdsArray.slice(i, i + BATCH_SIZE);
      const articlesRes = await fetch(
        `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi?db=pubmed&id=${idsBatch.join(
          ","
        )}&retmode=json&api_key=${API_KEY}`
      );
      const articlesJson = await articlesRes.json();
      const batchArticles = idsBatch.map((uid) => {
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
      const isLastBatch = i + BATCH_SIZE >= allIdsArray.length;
      onBatchUpdate(batchArticles, isLastBatch);

      articles.push(...batchArticles);

      await sleep(REQUEST_DELAY_MS);
    }
  } catch (error) {
    console.error("Error getting articles:", error);
  }
};

// GET abstract by article uid
export const getAbstract = async (uid: string): Promise<string> => {
  try {
    const res = await fetch(
      `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&id=${uid}&retmode=json&rettype=abstract&api_key=${API_KEY}`
    );
    const text = await res.text();
    return text;
  } catch (err) {
    console.error("Error getting abstract:", err);
    return "Error getting the abstract.";
  }
};
