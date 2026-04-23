import React from 'react';
import useNews from '../hooks/useNews';

export default function NewsTicker() {
  const { articles } = useNews(10);
  if (!articles.length) return null;

  return (
    <div id="quick-news">
      <div className="news x1">
        <ul>
          {articles.slice(0, 5).map((a, i) => (
            <li key={i} onClick={() => window.open(a.url, '_blank', 'noopener,noreferrer')}>
              {a.source}: {a.title}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
