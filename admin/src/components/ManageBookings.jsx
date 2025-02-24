import React, { useState, useEffect } from "react";
import axios from "axios";

function ManageBookings() {
  const [bookings, setBookings] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    const adminToken = localStorage.getItem("adminToken");
    if (!adminToken) {
      setMessage("Admin token is missing. Please log in again.");
      return;
    }

    try {
      const response = await axios.get("https://cricket-box-booking.onrender.com/api/admin/get-bookings", {
        headers: { Authorization: `Bearer ${adminToken}` },
      });

      setBookings(response.data.bookings);
    } catch (error) {
      console.error("Error fetching bookings:", error);
      setMessage(error.response?.data?.message || "Error fetching bookings.");
    }
  };

  // Confirm Booking
  const confirmBooking = async (id) => {
    try {
      const adminToken = localStorage.getItem("adminToken");
      if (!adminToken) return setMessage("Admin token is missing.");

      const response = await axios.put(
        `https://cricket-box-booking.onrender.com/api/admin/confirm-booking/${id}`,
        {},
        { headers: { Authorization: `Bearer ${adminToken}` } }
      );

      if (response.status === 200) {
        setBookings((prevBookings) =>
          prevBookings.map((booking) =>
            booking.id === id ? { ...booking, confirmed: true } : booking
          )
        );
        setMessage("Booking confirmed successfully!");
        setTimeout(() => setMessage(""), 3000);
      }
    } catch (error) {
      console.error("Error confirming booking:", error);
      setMessage("Error confirming booking.");
    }
  };

  // Delete Booking
  const deleteBooking = async (id) => {
    if (!window.confirm("Are you sure you want to delete this booking?")) return;

    try {
      const adminToken = localStorage.getItem("adminToken");
      if (!adminToken) return setMessage("Admin token is missing.");

      await axios.delete(`https://cricket-box-booking.onrender.com/api/admin/delete-booking/${id}`, {
        headers: { Authorization: `Bearer ${adminToken}` },
      });

      setBookings((prevBookings) => prevBookings.filter((booking) => booking.id !== id));
      setMessage("Booking deleted successfully!");
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      console.error("Error deleting booking:", error);
      setMessage("Error deleting booking.");
    }
  };

  return (
    <div className="manage-bookings">
      <h2>Manage Bookings</h2>

      {message && <div className="message">{message}</div>}

      <table className="booking-table">
      <thead>
            <tr>
              <th>User Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Booking Date</th>
              <th>Time Slot</th>
              <th>Price</th>
              <th>Turf Name</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking, index) => (
              <tr key={index}>
                <td>{booking.userDetails.name}</td>
                <td>{booking.userDetails.email}</td>
                <td>{booking.userDetails.phone}</td>
                <td>{booking.bookingDetails.date}</td>
                <td>
                  {booking.bookingDetails.timeSlots.map((slot, idx) => (
                    <div key={idx}>
                      {slot.startTime} to {slot.endTime}
                    </div>
                  ))}
                </td>
                <td>
                  {booking.bookingDetails.timeSlots.map((slot, idx) => (
                    <div key={idx}>₹{slot.price}</div>
                  ))}
                </td>
                <td>{booking.turfId.name}</td>
                <td>{booking.status}</td>
                <button className="confirm-btn" onClick={() => confirmBooking(booking._id)}>
              ✅ Confirm
            </button>

                <button className="delete-btn" onClick={() => deleteBooking(booking._id)}>
            ❌ Delete
          </button>

              </tr>
            ))}
          </tbody>      


      </table>
    </div>
  );
}

export default ManageBookings;
