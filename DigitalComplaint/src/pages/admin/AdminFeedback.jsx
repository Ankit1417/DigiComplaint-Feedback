import { useEffect, useState } from "react";
import axios from "axios";
import "./AdminFeedback.css";

function AdminFeedback() {
  const [feedbackList, setFeedbackList] = useState([]);

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/feedback", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setFeedbackList(res.data);
      } catch (err) {
        console.error("Error fetching feedback:", err);
      }
    };

    fetchFeedback();
  }, []);

  return (
    <div className="admin-feedback">
      <h2>All Feedback</h2>
      <table>
        <thead>
          <tr>
            <th>Category</th>
            <th>Rating</th>
            <th>Comment</th>
            <th>Submitted By</th>
          </tr>
        </thead>
        <tbody>
          {feedbackList.map((fb) => (
            <tr key={fb._id}>
              <td>{fb.category}</td>
              <td>{fb.rating}</td>
              <td>{fb.comment}</td>
              <td>{fb.user?.email || "Unknown"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminFeedback;
