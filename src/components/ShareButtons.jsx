import React, { useState } from 'react';
import { FaTwitter, FaWhatsapp, FaLink } from 'react-icons/fa';

export default function ShareButtons({ url, title }) {
  const [copied, setCopied] = useState(false);
  const text = encodeURIComponent(title);
  const link = encodeURIComponent(url);

  const copy = () => {
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const btnStyle = {
    border: 'none', background: 'none', cursor: 'pointer',
    padding: '4px 8px', borderRadius: 4, fontSize: 16
  };

  return (
    <span style={{ display: 'inline-flex', gap: 4, marginLeft: 8 }}>
      <button style={btnStyle} title="Share on X"
        onClick={() => window.open(`https://twitter.com/intent/tweet?text=${text}&url=${link}`, '_blank', 'noopener,noreferrer')}>
        <FaTwitter color="#1DA1F2" />
      </button>
      <button style={btnStyle} title="Share on WhatsApp"
        onClick={() => window.open(`https://wa.me/?text=${text}%20${link}`, '_blank', 'noopener,noreferrer')}>
        <FaWhatsapp color="#25D366" />
      </button>
      <button style={btnStyle} title={copied ? 'Copied!' : 'Copy link'} onClick={copy}>
        <FaLink color={copied ? '#dc3545' : '#666'} />
      </button>
    </span>
  );
}
