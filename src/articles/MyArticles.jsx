import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getMyArticles, deleteArticle } from '../api/articleApi';
import './MyArticles.css';

const MyArticles = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchMyArticles();
  }, []);

  const fetchMyArticles = async () => {
    try {
      const data = await getMyArticles();
      setArticles(data);
    } catch (error) {
      console.error('Error fetching articles:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this article?')) {
      return;
    }

    try {
      await deleteArticle(id);
      setArticles(articles.filter(article => article.id !== id));
      toast.success('Article deleted successfully!');
    } catch (error) {
      toast.error('Failed to delete article');
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading) {
    return <div className="loading">Loading your articles...</div>;
  }

  return (
    <div className="my-articles-container">
      <div className="header">
        <h1>My Articles</h1>
        <Link to="/articles/new" className="create-btn">
          + Create New Article
        </Link>
      </div>

      {articles.length === 0 ? (
        <div className="no-articles">
          <p>You haven't created any articles yet.</p>
          <Link to="/articles/new" className="create-link">
            Create your first article
          </Link>
        </div>
      ) : (
        <div className="articles-list">
          {articles.map(article => (
            <div key={article.id} className="article-item">
              <div className="article-main">
                <span className="category-badge">{article.category}</span>
                <h2>{article.title}</h2>
                <p className="summary">
                  {article.summary || article.content.substring(0, 150).replace(/<[^>]*>/g, '') + '...'}
                </p>
                <div className="article-meta">
                  <span>Created: {formatDate(article.createdAt)}</span>
                  {article.updatedAt !== article.createdAt && (
                    <span>Updated: {formatDate(article.updatedAt)}</span>
                  )}
                </div>
              </div>
              <div className="article-actions">
                <Link to={`/articles/${article.id}`} className="view-btn">
                  View
                </Link>
                <Link to={`/articles/edit/${article.id}`} className="edit-btn">
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(article.id)}
                  className="delete-btn"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyArticles;
