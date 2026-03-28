export default function QuoteCard({ quote, loading, visible }) {
  const handleCopy = () => {
    if (!quote?.text) return;
    const text = `"${quote.text}" — ${quote.author}${quote.year ? `, ${quote.year}` : ""}`;
    navigator.clipboard.writeText(text);
  };

  return (
    <div className={`quote-card ${visible && !loading ? "quote-card--visible" : ""}`}>
      {loading ? (
        <div className="quote-skeleton">
          <div className="skeleton-line skeleton-line--long" />
          <div className="skeleton-line skeleton-line--med" />
          <div className="skeleton-line skeleton-line--short" />
          <div className="skeleton-author" />
        </div>
      ) : quote ? (
        <>
          <div className="quote-mark">"</div>
          <blockquote className="quote-text">{quote.text}</blockquote>
          <footer className="quote-footer">
            <div className="quote-divider" />
            <cite className="quote-attribution">
              {quote.author && <span className="quote-author">{quote.author}</span>}
              {quote.year && <span className="quote-year">{quote.year}</span>}
            </cite>
            <button className="copy-btn" onClick={handleCopy} title="Copy quote">
              ⎘
            </button>
          </footer>
        </>
      ) : null}
    </div>
  );
}