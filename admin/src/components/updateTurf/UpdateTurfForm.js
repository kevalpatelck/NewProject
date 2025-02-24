import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import "../AddTurfForm.css";
import "leaflet/dist/leaflet.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import TurfDetails from "./TurfDetails";
import LocationSelector from "./LocationSelector";
import ContactDetails from "./ContactDetails";
import TimeSlotSelection from "./TimeSlotSelection";
import ImageUpload from "./ImageUpload";

const UpdateTurfForm = () => {
  const { turfId } = useParams(); // Get turf ID from URL
  const location = useLocation();
  const navigate = useNavigate();

  // Prefill form if data is passed from navigation state
  const [turf, setTurf] = useState(location.state?.turf || null);
  const [loading, setLoading] = useState(!location.state?.turf);
  const [updatedTurf, setUpdatedTurf] = useState(null);

  useEffect(() => {
    if (!turf) {
      fetchTurfDetails();
    }
  }, [turfId]);

  const fetchTurfDetails = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("adminToken");
      if (!token) {
        toast.error("Authentication failed! No token found.");
        return;
      }

      const response = await axios.get(
        `https://cricket-box-booking.onrender.com/api/admin/turf/${turfId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const turfData = response.data.turf;
      setTurf({
        name: turfData.name,
        address1: turfData.address1,
        address2: turfData.address2 || "",
        city: turfData.city,
        landmark: turfData.landmark || "",
        zipcode: turfData.zipcode,
        latitude: turfData.location.lat,
        longitude: turfData.location.lng,
        phone: turfData.contactDetails.phone,
        email: turfData.contactDetails.email,
        selectedSlots: turfData.timeSlots || [],
        images: turfData.images || [],
      });
    } catch (error) {
      console.error("Error fetching turf details:", error);
      toast.error("Failed to fetch turf details.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("adminToken");
    if (!token) {
      toast.error("Authentication failed! No token found.");
      return;
    }

    const formData = new FormData();
    formData.append("name", turf.name);
    formData.append("address1", turf.address1);
    formData.append("address2", turf.address2);
    formData.append("city", turf.city);
    formData.append("landmark", turf.landmark);
    formData.append("zipcode", turf.zipcode);
    formData.append("location[lat]", turf.latitude);
    formData.append("location[lng]", turf.longitude);
    formData.append("contactDetails[phone]", turf.phone);
    formData.append("contactDetails[email]", turf.email);

    // Append updated time slots
    turf.selectedSlots.forEach((slot, index) => {
      formData.append(`timeSlots[${index}][startTime]`, slot.startTime);
      formData.append(`timeSlots[${index}][endTime]`, slot.endTime);
      formData.append(`timeSlots[${index}][price]`, slot.price);
    });

    // Append new images, keeping old ones
    turf.images.forEach((image) => {
      if (image instanceof File) {
        formData.append("images", image);
      } else {
        formData.append("existingImages", image); // Keep existing images
      }
    });

    try {
      const response = await axios.put(
        `https://cricket-box-booking.onrender.com/api/admin/update-turf/${turfId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUpdatedTurf(response.data.turf);
      toast.success("Turf updated successfully!");

      // Clear success message after 3 seconds
      setTimeout(() => setUpdatedTurf(null), 3000);
    } catch (error) {
      console.error("Error updating turf:", error);
      toast.error(error.response?.data?.message || "Error updating turf.");
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="turf-form">
      <ToastContainer />
      <form onSubmit={handleSubmit}>
        <h2>Update Turf</h2>

        {/* Individual Components */}
        <TurfDetails turf={turf} setTurf={setTurf} />
        <LocationSelector turf={turf} setTurf={setTurf} />
        <ContactDetails turf={turf} setTurf={setTurf} />
        <TimeSlotSelection turf={turf} setTurf={setTurf} />
        <ImageUpload turf={turf} setTurf={setTurf} />

        <button type="submit" className="button">Update Turf</button>
      </form>

      {updatedTurf && (
        <div className="success-message">
          <h3>Turf Updated Successfully! 🎉</h3>
          <p><strong>Name:</strong> {updatedTurf.name}</p>
          <p><strong>City:</strong> {updatedTurf.city}</p>
          {updatedTurf.timeSlots &&
            updatedTurf.timeSlots.map((slot, index) => (
              <p key={index}><strong>Slot {index + 1}:</strong> {slot.startTime} - {slot.endTime} (₹{slot.price})</p>
            ))}
          <p><strong>Updated At:</strong> {new Date(updatedTurf.updatedAt).toLocaleString()}</p>
          <button onClick={() => navigate("/manageturfs")} className="button">Back to Turfs</button>
        </div>
      )}
    </div>
  );
};

export default UpdateTurfForm;
