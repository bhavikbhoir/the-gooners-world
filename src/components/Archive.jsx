import React from 'react';
import NewsFeed from './News/NewsFeed';

export default function Archive() {
  React.useEffect(() => {
    document.getElementById("archives").classList.add("active");
  });

  return (
    <div className="archive mb-2">
      <NewsFeed limit={undefined} />
    </div>
  );
}
