import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getArticleById } from '../api/articleApi';
import './ArticleDetail.css';

const ArticleDetail = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchArticle();
  }, [id]);

  const fetchArticle = async () => {
    try {
      const data = await getArticleById(id);
      setArticle(data);
    } catch (error) {
      console.error('Error fetching article:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return <div className="loading">Loading article...</div>;
  }

  if (!article) {
    return <div className="error">Article not found</div>;
  }

  return (
    <div className="article-detail-container">
      <button onClick={() => navigate(-1)} className="back-btn">
        ← Back
      </button>
      <article className="article-detail">
        <div className="article-header">
          <span className="category-badge">{article.category}</span>
          <h1>{article.title}</h1>
          <div className="article-info">
            <span className="author">By {article.authorName}</span>
            <span className="date">Published on {formatDate(article.createdAt)}</span>
            {article.updatedAt !== article.createdAt && (
              <span className="date">Updated on {formatDate(article.updatedAt)}</span>
            )}
          </div>
          {article.tags && (
            <div className="tags-container">
              {article.tags.split(',').map((tag, idx) => (
                <span key={idx} className="tag">{tag.trim()}</span>
              ))}
            </div>
          )}
        </div>
        <div 
          className="article-content"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />
      </article>
    </div>
  );
};

export default ArticleDetail;
