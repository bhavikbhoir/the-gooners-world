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
    <Card style={{ marginBottom: '1rem', overflow: 'hidden' }}>
      <div style={{ height: 180, overflow: 'hidden', flexShrink: 0 }}>
        <img
          src={article.image || PLACEHOLDER}
          alt={article.title}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          onError={(e) => { e.target.src = PLACEHOLDER; }}
        />
      </div>
      <Card.Body>
        <Card.Title style={{ fontSize: '0.95rem', lineHeight: 1.4 }}>
          {article.title}
        </Card.Title>
        {article.description && (
          <Card.Text style={{ fontSize: '0.85rem', color: '#555' }}>
            {article.description.length > 120 ? article.description.slice(0, 120) + '...' : article.description}
          </Card.Text>
        )}
        <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
          <a href={article.url} target="_blank" rel="noopener noreferrer"
            style={{ fontSize: '0.85rem', color: '#dc3545', fontWeight: 600 }}>
            Read Full Article →
          </a>
          <ShareButtons url={article.url} title={article.title} />
        </div>
      </Card.Body>
      <Card.Footer style={{ fontSize: '0.8rem', background: '#99824c', color: '#fff' }}>
        {article.source} &middot; {date}
      </Card.Footer>
    </Card>
  );
}

export default function NewsFeed({ count, searchable }) {
  const { articles, loading, error } = useNews();
  const [query, setQuery] = React.useState('');

  if (loading) return <div style={{ padding: '2rem', textAlign: 'center' }}>Loading news...</div>;
  if (error) return <div style={{ padding: '2rem', textAlign: 'center', color: 'grey' }}>News unavailable right now.</div>;
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
          style={{
            width: '100%', padding: '0.5rem 0.75rem', marginBottom: '1rem',
            border: '1px solid #ddd', borderRadius: 6, fontSize: '0.9rem'
          }}
        />
      )}
      <Row>
        {visible.map((a, i) => (
          <Col key={i} lg={4} md={6} sm={12} style={{ display: 'flex' }}>
            <NewsCard article={a} />
          </Col>
        ))}
      </Row>
      {searchable && query && !visible.length && (
        <div style={{ textAlign: 'center', color: '#999', padding: '1rem' }}>No articles match "{query}"</div>
      )}
    </div>
  );
}
