import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import './BlogPopup.css';

function BlogPopup() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 400);
    return () => clearTimeout(timer);
  }, []);

  const close = () => setIsVisible(false);

  if (!isVisible) return null;

  return createPortal(
    <div className="blog-popup-overlay" onClick={close}>
      <div className="blog-popup" onClick={(e) => e.stopPropagation()}>
        <button className="blog-popup-close" onClick={close} aria-label="Close">
          &times;
        </button>
        <h2>I've moved to a new site</h2>
        <p>
          This website hasn't been updated since July 8, 2026. Check out my
          new website at{' '}
          <a href="https://antoun.blog" target="_blank" rel="noopener noreferrer">
            antoun.blog
          </a>
        </p>
        <div className="blog-popup-actions">
          <a
            className="blog-popup-visit"
            href="https://antoun.blog"
            target="_blank"
            rel="noopener noreferrer"
          >
            Visit antoun.blog
          </a>
          <button className="blog-popup-dismiss" onClick={close}>
            Stay here
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}

export default BlogPopup;
