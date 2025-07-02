// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import "./SubmitComplaint.css";

// const SubmitComplaint = ({ editData = null, onComplaintUpdate, onCancelEdit }) => {
//   const categoryOptions = ["Infrastructure", "Sanitation", "Academic", "Administrative", "Other"];
//   const departmentOptions = ["Maintenance Department", "Facilities Management", "Academic Affairs", "Student Services"];

//   const [formData, setFormData] = useState({
//     category: "",
//     department: "",
//     title: "",
//     description: "",
//     attachment: null,
//     isAnonymous: false,
//     assignTo: "",
//   });

//   const [errors, setErrors] = useState({});
//   const [isEditMode, setIsEditMode] = useState(false);

//   useEffect(() => {
//     if (editData) {
//       setIsEditMode(true);
//       setFormData({
//         category: editData.category || "",
//         department: editData.department || "",
//         title: editData.title || "",
//         description: editData.description || "",
//         attachment: editData.attachment || null,
//         isAnonymous: editData.isAnonymous || false,
//         assignTo: editData.assignTo || "",
//       });
//     } else {
//       setIsEditMode(false);
//       resetForm();
//     }
//   }, [editData]);

//   const resetForm = () => {
//     setFormData({
//       category: "",
//       department: "",
//       title: "",
//       description: "",
//       attachment: null,
//       isAnonymous: false,
//       assignTo: "",
//     });
//     setErrors({});
//   };

//   const handleChange = (e) => {
//     const { name, value, type, checked, files } = e.target;
//     setFormData({
//       ...formData,
//       [name]: type === "checkbox" ? checked : type === "file" ? files[0] : value,
//     });
//     if (errors[name]) {
//       setErrors({ ...errors, [name]: "" });
//     }
//   };

//   const validateForm = () => {
//     const newErrors = {};
//     if (!formData.category) newErrors.category = "Category is required.";
//     if (!formData.department) newErrors.department = "Department is required.";
//     if (!formData.title.trim()) newErrors.title = "Title is required.";
//     if (!formData.description.trim()) newErrors.description = "Description is required.";
//     if (!formData.assignTo.trim()) newErrors.assignTo = "Assign To field is required.";
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!validateForm()) return;

//     try {
//       const token = localStorage.getItem("token");
//       const data = new FormData();

//       for (const key in formData) {
//         if (formData[key] !== null) {
//           data.append(key, formData[key]);
//         }
//       }

//       const res = await axios.post("http://localhost:5000/api/complaints", data, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       // alert("Complaint submitted successfully!");
//       alert(`Complaint submitted! Your complaint ID is ${res.data.complaint.complaintId}`);
//       resetForm();
//     } catch (err) {
//       console.error(err);
//       alert("Failed to submit complaint. Please try again.");
//     }
//   };

//   return (
//     <form className="complaint-form" onSubmit={handleSubmit}>
//       <h2>{isEditMode ? "Edit Complaint" : "Submit New Complaint"}</h2>

//       <div className="form-row">
//         <div className="form-group">
//           <label>Category:</label>
//           <select name="category" value={formData.category} onChange={handleChange}>
//             <option value="">Select Category</option>
//             {categoryOptions.map((option) => (
//               <option key={option} value={option}>{option}</option>
//             ))}
//           </select>
//           {errors.category && <span className="error">{errors.category}</span>}
//         </div>

//         <div className="form-group">
//           <label>Department:</label>
//           <select name="department" value={formData.department} onChange={handleChange}>
//             <option value="">Select Department</option>
//             {departmentOptions.map((option) => (
//               <option key={option} value={option}>{option}</option>
//             ))}
//           </select>
//           {errors.department && <span className="error">{errors.department}</span>}
//         </div>
//       </div>

//       <div className="form-group">
//         <label>Title:</label>
//         <input
//           type="text"
//           name="title"
//           value={formData.title}
//           onChange={handleChange}
//           placeholder="Enter complaint title"
//         />
//         {errors.title && <span className="error">{errors.title}</span>}
//       </div>

//       <div className="form-group">
//         <label>Description:</label>
//         <textarea
//           name="description"
//           value={formData.description}
//           onChange={handleChange}
//           rows="6"
//           placeholder="Describe your complaint in detail..."
//         />
//         {errors.description && <span className="error">{errors.description}</span>}
//       </div>

//       <div className="form-group">
//         <label>Assign To:</label>
//         <input
//           type="text"
//           name="assignTo"
//           value={formData.assignTo}
//           onChange={handleChange}
//           placeholder="Enter the name or role to assign"
//         />
//         {errors.assignTo && <span className="error">{errors.assignTo}</span>}
//       </div>

//       <div className="form-group">
//         <label>Attachment:</label>
//         <input
//           type="file"
//           name="attachment"
//           accept="image/*,.pdf,.doc,.docx"
//           onChange={handleChange}
//         />
//         <p className="file-note">Supported formats: JPEG, PNG, PDF, DOC (Max 5MB)</p>
//       </div>

//       <div className="form-group">
//         <label>
//           <input
//             type="checkbox"
//             name="isAnonymous"
//             checked={formData.isAnonymous}
//             onChange={handleChange}
//           />
//           Submit as Anonymous
//         </label>
//       </div>

//       <div className="form-buttons">
//         <button type="submit">{isEditMode ? "Update Complaint" : "Submit Complaint"}</button>
//         {isEditMode ? (
//           <button type="button" onClick={onCancelEdit} className="cancel-btn">Cancel</button>
//         ) : (
//           <button type="button" onClick={resetForm} className="cancel-btn">Clear Form</button>
//         )}
//       </div>
//     </form>
//   );
// };

// export default SubmitComplaint;

import React, { useState, useEffect } from "react";
import axios from "axios";
import "./SubmitComplaint.css";

const SubmitComplaint = ({ editData = null, onComplaintUpdate, onCancelEdit }) => {
  const categoryOptions = ["Infrastructure", "Sanitation", "Academic", "Administrative", "Other"];
  const departmentOptions = ["Maintenance Department", "Facilities Management", "Academic Affairs", "Student Services"];

  const [formData, setFormData] = useState({
    category: "",
    department: "",
    title: "",
    description: "",
    attachment: null,
    isAnonymous: false,
    assignTo: "",
  });

  const [errors, setErrors] = useState({});
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    if (editData) {
      setIsEditMode(true);
      setFormData({
        category: editData.category || "",
        department: editData.department || "",
        title: editData.title || "",
        description: editData.description || "",
        attachment: editData.attachment || null,
        isAnonymous: editData.isAnonymous || false,
        assignTo: editData.assignTo || "",
      });
    } else {
      setIsEditMode(false);
      resetForm();
    }
  }, [editData]);

  const resetForm = () => {
    setFormData({
      category: "",
      department: "",
      title: "",
      description: "",
      attachment: null,
      isAnonymous: false,
      assignTo: "",
    });
    setErrors({});
  };

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : type === "file" ? files[0] : value,
    });
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.category) newErrors.category = "Category is required.";
    if (!formData.department) newErrors.department = "Department is required.";
    if (!formData.title.trim()) newErrors.title = "Title is required.";
    if (!formData.description.trim()) newErrors.description = "Description is required.";
    if (!formData.assignTo.trim()) newErrors.assignTo = "Assign To field is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const token = localStorage.getItem("token");
      const data = new FormData();
      for (const key in formData) {
        if (formData[key] !== null) {
          data.append(key, formData[key]);
        }
      }

      const res = await axios.post("http://localhost:5000/api/complaints", data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      alert(`Complaint submitted! Your complaint ID is ${res.data.complaint.complaintId}`);
      resetForm();
    } catch (err) {
      console.error(err);
      alert("Failed to submit complaint. Please try again.");
    }
  };

  return (
    <div className="complaint-wrapper">
      <form className="complaint-form" onSubmit={handleSubmit}>
        <h2>{isEditMode ? "Edit Complaint" : "Submit New Complaint"}</h2>

        <div className="form-row">
          <div className="form-group">
            <label>Category:</label>
            <select name="category" value={formData.category} onChange={handleChange}>
              <option value="">Select Category</option>
              {categoryOptions.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
            {errors.category && <span className="error">{errors.category}</span>}
          </div>

          <div className="form-group">
            <label>Department:</label>
            <select name="department" value={formData.department} onChange={handleChange}>
              <option value="">Select Department</option>
              {departmentOptions.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
            {errors.department && <span className="error">{errors.department}</span>}
          </div>
        </div>

        <div className="form-group">
          <label>Title:</label>
          <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Enter complaint title" />
          {errors.title && <span className="error">{errors.title}</span>}
        </div>

        <div className="form-group">
          <label>Description:</label>
          <textarea name="description" value={formData.description} onChange={handleChange} rows="6" placeholder="Describe your complaint in detail..." />
          {errors.description && <span className="error">{errors.description}</span>}
        </div>

        <div className="form-group">
          <label>Assign To:</label>
          <input type="text" name="assignTo" value={formData.assignTo} onChange={handleChange} placeholder="Enter the name or role to assign" />
          {errors.assignTo && <span className="error">{errors.assignTo}</span>}
        </div>

        <div className="form-group">
          <label>Attachment:</label>
          <input type="file" name="attachment" accept="image/*,.pdf,.doc,.docx" onChange={handleChange} />
          <p className="file-note">Supported formats: JPEG, PNG, PDF, DOC (Max 5MB)</p>
        </div>

        <div className="form-group">
          <label>
            <input type="checkbox" name="isAnonymous" checked={formData.isAnonymous} onChange={handleChange} />
            Submit as Anonymous
          </label>
        </div>

        <div className="form-buttons">
          <button type="submit">{isEditMode ? "Update Complaint" : "Submit Complaint"}</button>
          {isEditMode ? (
            <button type="button" onClick={onCancelEdit} className="cancel-btn">Cancel</button>
          ) : (
            <button type="button" onClick={resetForm} className="cancel-btn">Clear Form</button>
          )}
        </div>
      </form>
    </div>
  );
};

export default SubmitComplaint;
