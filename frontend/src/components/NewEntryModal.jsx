import { useState } from 'react';

const NewEntryModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    title: '',
    link: '',
    date: new Date().toISOString().split('T')[0],
    comment: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form data:', formData);
    onClose();
    setFormData({
      title: '',
      link: '',
      date: new Date().toISOString().split('T')[0],
      comment: ''
    });
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>New Reading Entry</h2>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-field">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-field">
            <label htmlFor="link">Link</label>
            <input
              type="url"
              id="link"
              name="link"
              value={formData.link}
              onChange={handleChange}
              placeholder="https://"
            />
          </div>

          <div className="form-field">
            <label htmlFor="date">Date</label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-field">
            <label htmlFor="comment">Comment</label>
            <textarea
              id="comment"
              name="comment"
              value={formData.comment}
              onChange={handleChange}
              rows="6"
              placeholder="Your thoughts on this reading..."
            />
          </div>

          <div className="form-actions">
            <button type="button" onClick={onClose} className="button-secondary">
              Cancel
            </button>
            <button type="submit" className="button-primary">
              Save Entry
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewEntryModal;