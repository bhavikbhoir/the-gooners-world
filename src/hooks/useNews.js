import { useState, useEffect } from 'react';
import { fetchArsenalNews } from '../api/news';

export default function useNews() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    fetchArsenalNews()
      .then((data) => { if (!cancelled) setArticles(data); })
      .catch((err) => { if (!cancelled) setError(err.message); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, []);

  return { articles, loading, error };
}
