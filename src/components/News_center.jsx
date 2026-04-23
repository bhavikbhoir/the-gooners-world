import React from 'react';
import NewsFeed from './News/NewsFeed';

export default function NewsCenter() {
  React.useEffect(() => {
    document.getElementById("news-center").classList.add("active");
  });

  return (
    <div className="news-center">
      <NewsFeed />
    </div>
  );
}
