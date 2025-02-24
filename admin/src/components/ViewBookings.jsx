import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AdminList.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ViewBookings() {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showModall, setShowModall] = useState(false);
  const [superAdmin, setsuperAdmin] = useState({ name: "", email: "", password: "" });

  const [newAdmin, setNewAdmin] = useState({ name: "", email: "", password: "" });
  const [showContactModal, setShowContactModal] = useState(false);
  const [contactMessages, setContactMessages] = useState([]);

  useEffect(() => {
    fetchAdmins();
  }, []);

  const fetchAdmins = async () => {
    try {
      const response = await axios.get("https://cricket-box-booking.onrender.com/api/superAdmin/getall-admin");
      console.log("API Response:", response.data);
      setAdmins(response.data.admins);
    } catch (err) {
      setError("Failed to fetch admin data");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (adminId) => {
    if (!window.confirm("Are you sure you want to delete this admin?")) return;
    try {
      await axios.delete(`https://cricket-box-booking.onrender.com/api/superAdmin/${adminId}`);
      setAdmins(admins.filter((admin) => admin._id !== adminId));
      toast.success("Admin deleted successfully!", {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });
    } catch (error) {
      alert("Failed to delete admin.");
    }
  };




  const handleAddAdmin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://cricket-box-booking.onrender.com/api/superAdmin/create-admin",
        newAdmin,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      fetchAdmins();
      setShowModal(false);
      setNewAdmin({ name: "", email: "", password: "" });

      toast.success("Admin added successfully!", {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });
    } catch (error) {
      alert(error.response?.data?.message || "Failed to add admin.");
    }
  };
  const handleAddsuperAdmin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://cricket-box-booking.onrender.com/api/superAdmin/register",
        superAdmin,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      setShowModall(false);
      setsuperAdmin({ name: "", email: "", password: "" });

      toast.success("superAdmin added successfully!", {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });
    } catch (error) {
      alert(error.response?.data?.message || "Failed to add superadmin.");
    }
  };

  const handleShowContactMessages = async () => {
    try {
      const response = await axios.get("https://cricket-box-booking.onrender.com/api/superAdmin/contacts");
      setContactMessages(response.data);
      setShowContactModal(true);
    } catch (error) {
      setError("Failed to fetch contact messages");
    }
  };

  const handleCloseContactModal = () => {
    setShowContactModal(false);
  };

  if (loading) return <p className="text-center text-blue-500">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="container">
      {/* Header with Add Admin Button */}
      <div className="header">
        <h1 className="title">Admin List</h1>
        <button className="add-admin-btn" onClick={() => setShowModal(true)}>
          ➕ Add Admin
        </button>
        <button className="add-admin-btn" onClick={() => setShowModall(true)}>
          ➕ Add Superadmin
        </button>
        <button className="add-admin-btn" onClick={handleShowContactMessages}>
          Show Messages
        </button>
      </div>

      {/* Admin Table */}
      <div className="table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {admins.map((admin, index) => (
              <tr key={index}>
                <td>{admin._id}</td>
                <td>{admin.name}</td>
                <td>{admin.email}</td>
                <td>{admin.role || "Admin"}</td>
                <td>
                  <button className="delete-btn" onClick={() => handleDelete(admin._id)}>
                    ❌ Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Admin Modal */}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Add New Admin</h2>
            <form onSubmit={handleAddAdmin}>
              <label>Name:</label>
              <input
                type="text"
                value={newAdmin.name}
                onChange={(e) => setNewAdmin({ ...newAdmin, name: e.target.value })}
                required
              />
              <label>Email:</label>
              <input
                type="email"
                value={newAdmin.email}
                onChange={(e) => setNewAdmin({ ...newAdmin, email: e.target.value })}
                required
              />
              <label>Password:</label>
              <input
                type="password"
                value={newAdmin.password}
                onChange={(e) => setNewAdmin({ ...newAdmin, password: e.target.value })}
                required
              />
              <div className="modal-buttons">
                <button type="submit" className="submit-btn">Add Admin</button>
                <button type="button" className="cancel-btn" onClick={() => setShowModal(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

{showModall && (
        <div className="modal">
          <div className="modal-content">
            <h2>Add New superAdmin</h2>
            <form onSubmit={handleAddsuperAdmin}>
              <label>Name:</label>
              <input
                type="text"
                value={superAdmin.name}
                onChange={(e) => setsuperAdmin({ ...superAdmin, name: e.target.value })}
                required
              />
              <label>Email:</label>
              <input
                type="email"
                value={superAdmin.email}
                onChange={(e) => setsuperAdmin({ ...superAdmin, email: e.target.value })}
                required
              />
              <label>Password:</label>
              <input
                type="password"
                value={superAdmin.password}
                onChange={(e) => setsuperAdmin({ ...superAdmin, password: e.target.value })}
                required
              />
              <div className="modal-buttons">
                <button type="submit" className="submit-btn">Add superAdmin</button>
                <button type="button" className="cancel-btn" onClick={() => setShowModall(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}


      {/* Contact Messages Modal */}
      {showContactModal && (
        <div className="modal">
          <div className="modal-content contact-modal-content">
            <h2>Contact Messages</h2>
            {contactMessages.length > 0 ? (
              <div className="message-container scrollable-container">
                {contactMessages.map((message) => (
                  <div key={message._id} className="message-box">
                    <p><strong>Name:</strong> {message.fullname}</p>
                    <p><strong>Email:</strong> {message.email}</p>
                    <p><strong>Subject:</strong> {message.subject}</p>
                    <p><strong>Message:</strong> {message.message}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p>No messages found.</p>
            )}
            <div className="modal-buttons">
              <button type="button" className="cancel-btn" onClick={handleCloseContactModal}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ViewBookings;