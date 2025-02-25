import React, { useState } from "react";
import axios from "axios";
import "../AddTurfForm.css";
import "leaflet/dist/leaflet.css";


import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TurfDetails from "./TurfDetails";
import LocationSelector from "./LocationSelector";
import ContactDetails from "./ContactDetails";
import TimeSlotSelection from "./TimeSlotSelection";
import ImageUpload from "./ImageUpload";

const AddTurfForm = () => {
  const [turf, setTurf] = useState({
    name: "",
    address1: "",
    address2: "",
    city: "",
    landmark: "",
    zipcode: "",
    latitude: "",
    longitude: "",
    phone: "",
    email: "",
    // selectedSlots: { startTime: "", endTime: "", price: "" },
     selectedSlots: [],
    images: [],
  });

  const [addedTurf, setAddedTurf] = useState(null); // Store added turf details


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
  
    // Append multiple time slots
    turf.selectedSlots.forEach((slot, index) => {
        formData.append(`timeSlots[${index}][startTime]`, slot.startTime);
        formData.append(`timeSlots[${index}][endTime]`, slot.endTime);
        formData.append(`timeSlots[${index}][price]`, slot.price);
      });
  
    // Append images
    turf.images.forEach((image) => {
      formData.append("images", image);
    });
  
    // Print formData before sending
for (let [key, value] of formData.entries()) {
    console.log(key, value);
  }
  
    try {
      const response = await axios.post(
        "https://cricket-box-booking.onrender.com/api/admin/add-turf",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      setAddedTurf(response.data.turf);
      toast.success("Turf added successfully!");
  
      setTurf({
        name: "",
        address1: "",
        address2: "",
        city: "",
        landmark: "",
        zipcode: "",
        latitude: "",
        longitude: "",
        phone: "",
        email: "",
        selectedSlots: [], // Reset time slots
        images: [],
      });
    } catch (error) {
      console.error("Error adding turf:", error);
      toast.error(error.response?.data?.message || "Error adding turf.");
    }
  };
  

  return (
    <div className="turf-form">
      <ToastContainer />
      <form onSubmit={handleSubmit}>
        <h2>Add New Turf</h2>

        {/* Individual Components */}
        <TurfDetails turf={turf} setTurf={setTurf} />
        <LocationSelector turf={turf} setTurf={setTurf} />
        <ContactDetails turf={turf} setTurf={setTurf} />
        <TimeSlotSelection turf={turf} setTurf={setTurf} />
        <ImageUpload turf={turf} setTurf={setTurf} />

        <button type="submit" className="button">Add Turf</button>
      </form>

      {/* Show added turf details if available */}
      {addedTurf && (
        <div className="success-message">
          <h3>Turf Added Successfully! 🎉</h3>
          <p><strong>Name:</strong> {addedTurf.name}</p>
          <p><strong>City:</strong> {addedTurf.city}</p>
          {/* <p><strong>Price:</strong> ₹{addedTurf.timeSlot.price}</p> */}
          {/* <p><strong>Price:</strong> ₹{addedTurf.timeSlot.price}</p> */}
          {addedTurf.timeSlots && addedTurf.timeSlots.map((slot, index) => (
  <p key={index}><strong>Slot {index + 1}:</strong> {slot.startTime} - {slot.endTime} (₹{slot.price})</p>
))}

          <p><strong>Created At:</strong> {new Date(addedTurf.createdAt).toLocaleString()}</p>
        </div>
      )}
    </div>
  );
};

export default AddTurfForm;
