import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import useNews from '../../hooks/useNews';
import ShareButtons from '../ShareButtons';

const PLACEHOLDER = 'data:image/svg+xml,' + encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" width="400" height="200" fill="%23eee"><rect width="400" height="200"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="%23999" font-size="16">No Image</text></svg>'
);

function NewsCard({ article }) {
  const date = new Date(article.publishedAt).toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric'
  });

  return (
    <Card className="news-card">
      <div className="news-card__image-wrap">
        <img
          src={article.image || PLACEHOLDER}
          alt={article.title}
          className="news-card__image"
          onError={(e) => { e.target.src = PLACEHOLDER; }}
        />
      </div>
      <Card.Body>
        <Card.Title className="news-card__title">{article.title}</Card.Title>
        {article.description && (
          <Card.Text className="news-card__desc">
            {article.description.length > 120 ? article.description.slice(0, 120) + '...' : article.description}
          </Card.Text>
        )}
        <div className="news-card__actions">
          <a href={article.url} target="_blank" rel="noopener noreferrer" className="news-card__link">
            Read Full Article →
          </a>
          <ShareButtons url={article.url} title={article.title} />
        </div>
      </Card.Body>
      <Card.Footer className="news-card__footer">
        {article.source} &middot; {date}
      </Card.Footer>
    </Card>
  );
}

export default function NewsFeed({ count, searchable }) {
  const { articles, loading, error } = useNews();
  const [query, setQuery] = React.useState('');

  if (loading) return <div className="loading">Loading news...</div>;
  if (error) return <div className="loading" style={{ color: 'grey' }}>News unavailable right now.</div>;
  if (!articles.length) return null;

  let visible = count ? articles.slice(0, count) : articles;
  if (searchable && query) {
    const q = query.toLowerCase();
    visible = visible.filter((a) =>
      a.title.toLowerCase().includes(q) || a.source.toLowerCase().includes(q)
    );
  }

  return (
    <div className="news">
      <h3>Latest News <span role="img" aria-label="news icon"> 🗞️</span></h3>
      {searchable && (
        <input
          type="text"
          placeholder="Filter by keyword or source..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="news-search"
        />
      )}
      <Row>
        {visible.map((a, i) => (
          <Col key={i} lg={4} md={6} sm={12} className="d-flex">
            <NewsCard article={a} />
          </Col>
        ))}
      </Row>
      {searchable && query && !visible.length && (
        <div className="news-empty">No articles match "{query}"</div>
      )}
    </div>
  );
}
