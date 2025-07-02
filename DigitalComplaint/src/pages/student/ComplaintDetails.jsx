import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ComplaintDetails.css";

const ComplaintDetails = () => {
  const [complaints, setComplaints] = useState([]);
  const [editComplaint, setEditComplaint] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formErrors, setFormErrors] = useState({});

  const fetchComplaints = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/api/details", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setComplaints(res.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching complaints:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this complaint?")) return;

    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/api/details/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setComplaints(complaints.filter((comp) => comp._id !== id));
    } catch (err) {
      alert("Failed to delete complaint");
    }
  };

  const handleEditClick = (complaint) => {
    setEditComplaint({ ...complaint });
    setFormErrors({});
  };

  const handleEditChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setEditComplaint({
      ...editComplaint,
      [name]: type === "checkbox" ? checked : type === "file" ? files[0] : value,
    });
    if (formErrors[name]) setFormErrors({ ...formErrors, [name]: "" });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const { category, department, title, description, assignTo } = editComplaint;
    const errors = {};
    if (!category) errors.category = "Required";
    if (!department) errors.department = "Required";
    if (!title) errors.title = "Required";
    if (!description) errors.description = "Required";
    if (!assignTo) errors.assignTo = "Required";

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      Object.entries(editComplaint).forEach(([key, value]) => {
        if (value !== null) formData.append(key, value);
      });

      await axios.put(`http://localhost:5000/api/details/${editComplaint._id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setEditComplaint(null);
      fetchComplaints(); // refresh
    } catch (err) {
      alert("Failed to update complaint");
    }
  };

  if (loading) return <p>Loading complaints...</p>;

  return (
    <div className="complaint-list-wrapper">
      <h2>Your Complaints</h2>

      {complaints.length === 0 ? (
        <p>No complaints found.</p>
      ) : (
        complaints.map((comp) => (
          <div className="complaint-card" key={comp._id}>
            {editComplaint && editComplaint._id === comp._id ? (
              <form onSubmit={handleEditSubmit} className="edit-form">
                <label>Title:</label>
                <input
                  type="text"
                  name="title"
                  value={editComplaint.title}
                  onChange={handleEditChange}
                />
                {formErrors.title && <span className="error">{formErrors.title}</span>}

                <label>Description:</label>
                <textarea
                  name="description"
                  value={editComplaint.description}
                  onChange={handleEditChange}
                ></textarea>
                {formErrors.description && <span className="error">{formErrors.description}</span>}

                <label>Category:</label>
                <input
                  type="text"
                  name="category"
                  value={editComplaint.category}
                  onChange={handleEditChange}
                />
                {formErrors.category && <span className="error">{formErrors.category}</span>}

                <label>Department:</label>
                <input
                  type="text"
                  name="department"
                  value={editComplaint.department}
                  onChange={handleEditChange}
                />
                {formErrors.department && <span className="error">{formErrors.department}</span>}

                <label>Assign To:</label>
                <input
                  type="text"
                  name="assignTo"
                  value={editComplaint.assignTo}
                  onChange={handleEditChange}
                />
                {formErrors.assignTo && <span className="error">{formErrors.assignTo}</span>}

                <label>Attachment (optional):</label>
                <input type="file" name="attachment" onChange={handleEditChange} />

                <label>
                  <input
                    type="checkbox"
                    name="isAnonymous"
                    checked={editComplaint.isAnonymous}
                    onChange={handleEditChange}
                  />{" "}
                  Submit as Anonymous
                </label>

                <button type="submit">Update</button>
                <button type="button" onClick={() => setEditComplaint(null)}>
                  Cancel
                </button>
              </form>
            ) : (
              <>
                <h3>{comp.title}</h3>
                <p><strong>Complaint ID:</strong> {comp.complaintId}</p>
                <p><strong>Status:</strong> {comp.status}</p>
                <p><strong>Category:</strong> {comp.category}</p>
                <p><strong>Department:</strong> {comp.department}</p>
                <p><strong>Assign To:</strong> {comp.assignTo}</p>
                <p><strong>Description:</strong> {comp.description}</p>
                {comp.attachment && (
                  <p>
                    <strong>Attachment: </strong>
                    <a
                      href={`http://localhost:5000/${comp.attachment}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View
                    </a>
                  </p>
                )}
                <div className="action-buttons">
                  <button onClick={() => handleEditClick(comp)}>Edit</button>
                  <button onClick={() => handleDelete(comp._id)} className="delete-btn">
                    Delete
                  </button>
                </div>
              </>

            )}
          </div>
        ))
      )}
    </div>
  );
};

export default ComplaintDetails;
