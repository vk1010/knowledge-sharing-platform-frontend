import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllArticles, searchArticles } from '../api/articleApi';
import './Home.css';

const CATEGORIES = ['Tech', 'AI', 'Backend', 'Frontend', 'DevOps', 'Database', 'Mobile'];

const Home = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      const data = await getAllArticles();
      setArticles(data);
    } catch (error) {
      console.error('Error fetching articles:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await searchArticles(searchKeyword, selectedCategory);
      setArticles(data);
    } catch (error) {
      console.error('Error searching articles:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSearchKeyword('');
    setSelectedCategory('');
    fetchArticles();
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="home-container">
      <div className="search-section">
        <h1>Knowledge Sharing Platform</h1>
        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            placeholder="Search articles..."
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            className="search-input"
          />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="category-select"
          >
            <option value="">All Categories</option>
            {CATEGORIES.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          <button type="submit" className="search-btn">Search</button>
          <button type="button" onClick={handleReset} className="reset-btn">Reset</button>
        </form>
      </div>

      {loading ? (
        <div className="loading">Loading articles...</div>
      ) : (
        <div className="articles-grid">
          {articles.length === 0 ? (
            <p className="no-articles">No articles found</p>
          ) : (
            articles.map(article => (
              <div key={article.id} className="article-card">
                <div className="article-category">{article.category}</div>
                <h2>{article.title}</h2>
                <p className="article-summary">
                  {article.summary || article.content.substring(0, 150) + '...'}
                </p>
                <div className="article-meta">
                  <span className="author">By {article.authorName}</span>
                  <span className="date">{formatDate(article.createdAt)}</span>
                </div>
                {article.tags && (
                  <div className="article-tags">
                    {article.tags.split(',').map((tag, idx) => (
                      <span key={idx} className="tag">{tag.trim()}</span>
                    ))}
                  </div>
                )}
                <Link to={`/articles/${article.id}`} className="read-more">
                  Read More →
                </Link>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Home;
