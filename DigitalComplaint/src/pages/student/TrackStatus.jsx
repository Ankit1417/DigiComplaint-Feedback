
import React, { useState } from 'react';
import axios from 'axios';
import './TrackStatus.css';

const TrackStatus = () => {
  const [complaintId, setComplaintId] = useState('');
  const [error, setError] = useState('');
  const [currentComplaint, setCurrentComplaint] = useState(null);

  const statusStages = ['Pending', 'In Progress', 'Resolved', 'Rejected'];

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!complaintId.trim()) {
      setError('Please enter a valid Complaint ID');
      return;
    }

    try {
      const res = await axios.get(`http://localhost:5000/api/track/${complaintId}`);
      setCurrentComplaint(res.data);
      setError('');
    } catch (err) {
      console.error(err);
      setCurrentComplaint(null);
      setError('Complaint not found. Please check the ID.');
    }
  };

  const getStatusIndex = (status) => statusStages.indexOf(status);

  return (
    <div className="track-status-container">
      <div className="search-section">
        <h2>Track Complaint Status</h2>
        <form onSubmit={handleSearch} className="search-form">
          <div className="form-group">
            <input
              type="text"
              value={complaintId}
              onChange={(e) => setComplaintId(e.target.value)}
              placeholder="Enter Complaint ID (e.g. CMP-12345)"
              className={error ? 'error-input' : ''}
            />
            {error && <span className="error-message">{error}</span>}
          </div>
          <div className="form-buttons">
            <button type="submit" className="search-button">Search</button>
            <button
              type="button"
              onClick={() => {
                setComplaintId('');
                setCurrentComplaint(null);
                setError('');
              }}
              className="clear-button"
            >
              Clear
            </button>
          </div>
        </form>
      </div>

      {currentComplaint && (
        <div className="status-details">
          <div className="complaint-header">
            <h3>Complaint Details</h3>
            <span className={`status-badge ${currentComplaint.status.toLowerCase().replace(' ', '-')}`}>
              {currentComplaint.status}
            </span>
          </div>

          <div className="details-grid">
            <div className="detail-item">
              <label>Complaint ID:</label>
              <span>{currentComplaint.complaintId}</span>
            </div>
            <div className="detail-item">
              <label>Category:</label>
              <span>{currentComplaint.category}</span>
            </div>
            <div className="detail-item">
              <label>Date Submitted:</label>
              <span>{new Date(currentComplaint.createdAt).toLocaleDateString()}</span>
            </div>
            <div className="detail-item">
              <label>Assigned To:</label>
              <span>{currentComplaint.assignTo}</span>
            </div>
          </div>

          <div className="status-timeline">
            {statusStages.map((status, index) => (
              <div
                key={status}
                className={`timeline-step ${
                  index <= getStatusIndex(currentComplaint.status) ? 'active' : ''
                } ${index === getStatusIndex(currentComplaint.status) ? 'current' : ''}`}
              >
                <div className="timeline-icon">
                  {index < getStatusIndex(currentComplaint.status) ? (
                    <svg viewBox="0 0 24 24" width="20" height="20" fill="green">
                      <path d="M20.285 6.709a1 1 0 0 0-1.414-1.418l-9.192 9.192-4.242-4.242a1 1 0 0 0-1.414 1.414l5 5a1 1 0 0 0 1.414 0l9.848-9.846z" />
                    </svg>
                  ) : (
                    <div className="status-dot" />
                  )}
                </div>
                <div className="timeline-content">
                  <h4>{status}</h4>
                  {currentComplaint.updates
                    .filter((update) => update.status === status)
                    .map((update, idx) => (
                      <div key={idx} className="status-update">
                        <span className="update-date">
                          {new Date(update.date).toLocaleDateString()}
                        </span>
                        <p>{update.description}</p>
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>

          {currentComplaint.attachment && (
            <div className="attachments-section">
              <h4>Attachments</h4>
              <a
                href={`http://localhost:5000/${currentComplaint.attachment}`}
                target="_blank"
                rel="noopener noreferrer"
                className="attachment-link"
              >
                View Attachment
              </a>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TrackStatus;
