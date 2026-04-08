import { useState, useEffect } from "react";
import QuoteCard from "./Components/QuoteCard";
import CategorySelector from "./Components/Categoryselector";
import { quotes } from "./data/quotes";
import "./styles.css";

const CATEGORIES = ["Wisdom", "Motivation", "Philosophy", "Humor", "Life"];

export default function App() {
  const [quote, setQuote] = useState(null);
  const [category, setCategory] = useState("Wisdom");
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [history, setHistory] = useState([]);

  const fetchQuote = (cat) => {
    setLoading(true);
    setVisible(false);

    // Get quotes for the selected category
    const categoryQuotes = quotes[cat] || quotes.Wisdom;
    
    // Select a random quote from the category
    const randomQuote = categoryQuotes[Math.floor(Math.random() * categoryQuotes.length)];
    
    setQuote(randomQuote);
    setHistory((h) => [randomQuote, ...h].slice(0, 5));

    setLoading(false);
    setTimeout(() => setVisible(true), 50);
  };

  useEffect(() => {
    fetchQuote(category);
  }, []);

  const handleCategory = (cat) => {
    setCategory(cat);
    fetchQuote(cat);
  };

  return (
    <div className="app">
      <header className="app-header">
        <div className="logo">❝</div>
        <h1 className="app-title">Quotidian</h1>
        <p className="app-sub">Some daily inspiration</p>
      </header>

      <CategorySelector
        categories={CATEGORIES}
        active={category}
        onSelect={handleCategory}
      />

      <main className="main">
        <QuoteCard quote={quote} loading={loading} visible={visible} />

        <button
          className="generate-btn"
          onClick={() => fetchQuote(category)}
          disabled={loading}
        >
          {loading ? (
            <span className="spinner" />
          ) : (
            <>
              <span className="btn-icon">↻</span> New Quote
            </>
          )}
        </button>
      </main>

      {history.length > 1 && (
        <section className="history">
          <p className="history-label">Recent</p>
          <ul className="history-list">
            {history.slice(1).map((q, i) => (
              <li
                key={i}
                className="history-item"
                onClick={() => { setQuote(q); setVisible(true); }}
              >
                <span className="history-text">"{q.text.slice(0, 60)}{q.text.length > 60 ? "…" : ""}"</span>
                {q.author && <span className="history-author">— {q.author}</span>}
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
