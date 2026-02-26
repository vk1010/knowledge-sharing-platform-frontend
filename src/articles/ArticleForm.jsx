import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ReactQuill from 'react-quill';
import { toast } from 'react-toastify';
import 'react-quill/dist/quill.snow.css';
import { createArticle, updateArticle, getArticleById } from '../api/articleApi';
import { getAIAssistance } from '../api/aiApi';
import './ArticleForm.css';

const CATEGORIES = ['Tech', 'AI', 'Backend', 'Frontend', 'DevOps', 'Database', 'Mobile'];

const ArticleForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: '',
    tags: '',
    summary: ''
  });
  const [loading, setLoading] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (id) {
      fetchArticle();
    }
  }, [id]);

  const fetchArticle = async () => {
    try {
      const data = await getArticleById(id);
      setFormData({
        title: data.title,
        content: data.content,
        category: data.category,
        tags: data.tags || '',
        summary: data.summary || ''
      });
    } catch (error) {
      setError('Failed to load article');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (id) {
        await updateArticle(id, formData);
        toast.success('Article updated successfully!');
      } else {
        await createArticle(formData);
        toast.success('Article created successfully!');
      }
      navigate('/my-articles');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to save article');
    } finally {
      setLoading(false);
    }
  };

  const handleAIAssist = async (action) => {
    if (!formData.content) {
      toast.warning('Please write some content first');
      return;
    }

    setAiLoading(true);
    try {
      const response = await getAIAssistance(formData.content, action, formData.title);
      
      if (action === 'IMPROVE') {
        setFormData({ ...formData, content: response.result });
      } else if (action === 'SUMMARIZE') {
        setFormData({ ...formData, summary: response.result });
      } else if (action === 'SUGGEST_TAGS') {
        setFormData({ ...formData, tags: response.result });
      } else if (action === 'SUGGEST_TITLE') {
        setFormData({ ...formData, title: response.result });
      }
      toast.success('AI assistance applied!');
    } catch (error) {
      toast.error('AI assistance failed. Please try again.');
    } finally {
      setAiLoading(false);
    }
  };

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      ['blockquote', 'code-block'],
      ['link'],
      ['clean']
    ],
  };

  return (
    <div className="article-form-container">
      <h1>{id ? 'Edit Article' : 'Create New Article'}</h1>
      {error && <div className="error-message">{error}</div>}
      
      <form onSubmit={handleSubmit} className="article-form">
        <div className="form-group">
          <label>Title *</label>
          <div className="input-with-ai">
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
              maxLength="200"
            />
            <button
              type="button"
              onClick={() => handleAIAssist('SUGGEST_TITLE')}
              disabled={aiLoading}
              className="ai-btn"
            >
              ✨ AI Title
            </button>
          </div>
        </div>

        <div className="form-group">
          <label>Category *</label>
          <select
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            required
          >
            <option value="">Select Category</option>
            {CATEGORIES.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Content *</label>
          <ReactQuill
            theme="snow"
            value={formData.content}
            onChange={(value) => setFormData({ ...formData, content: value })}
            modules={modules}
            className="editor"
          />
          <div className="ai-buttons">
            <button
              type="button"
              onClick={() => handleAIAssist('IMPROVE')}
              disabled={aiLoading}
              className="ai-btn"
            >
              ✨ Improve with AI
            </button>
          </div>
        </div>

        <div className="form-group">
          <label>Summary</label>
          <div className="input-with-ai">
            <textarea
              value={formData.summary}
              onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
              rows="3"
            />
            <button
              type="button"
              onClick={() => handleAIAssist('SUMMARIZE')}
              disabled={aiLoading}
              className="ai-btn"
            >
              ✨ AI Summary
            </button>
          </div>
        </div>

        <div className="form-group">
          <label>Tags (comma-separated)</label>
          <div className="input-with-ai">
            <input
              type="text"
              value={formData.tags}
              onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
              placeholder="react, javascript, tutorial"
            />
            <button
              type="button"
              onClick={() => handleAIAssist('SUGGEST_TAGS')}
              disabled={aiLoading}
              className="ai-btn"
            >
              ✨ AI Tags
            </button>
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" disabled={loading || aiLoading} className="submit-btn">
            {loading ? 'Saving...' : (id ? 'Update Article' : 'Create Article')}
          </button>
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="cancel-btn"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default ArticleForm;
