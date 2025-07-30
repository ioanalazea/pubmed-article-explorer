import { useEffect } from "react";

function ArticlePage() {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=pubmed&term=artificial+intelligence+in+healthcare&retmode=json&retmax=10");
        const json = await res.json();
        console.log(json)
      } catch (err) {
        console.log("Error");
      } finally {
        console.log("Worked!");
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <div className="bg-[#74B3CE] text-white font-bold text-2xl p-4">
        PubMed Article Explorer
      </div>
    </div>
  );
}

export { ArticlePage };
