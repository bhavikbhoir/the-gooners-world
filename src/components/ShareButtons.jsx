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

  return (
    <span className="share-buttons">
      <button className="share-buttons__btn" title="Share on X"
        onClick={() => window.open(`https://twitter.com/intent/tweet?text=${text}&url=${link}`, '_blank', 'noopener,noreferrer')}>
        <FaTwitter color="#1DA1F2" />
      </button>
      <button className="share-buttons__btn" title="Share on WhatsApp"
        onClick={() => window.open(`https://wa.me/?text=${text}%20${link}`, '_blank', 'noopener,noreferrer')}>
        <FaWhatsapp color="#25D366" />
      </button>
      <button className="share-buttons__btn" title={copied ? 'Copied!' : 'Copy link'} onClick={copy}>
        <FaLink color={copied ? '#dc3545' : '#666'} />
      </button>
    </span>
  );
}
