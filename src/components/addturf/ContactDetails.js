import React from "react";

const ContactDetails = ({ turf, setTurf }) => {
  const handleChange = (e) => {
    setTurf({ ...turf, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <label>Phone:</label>
      <input type="text" name="phone" value={turf.phone} onChange={handleChange} required />

      <label>Email:</label>
      <input type="email" name="email" value={turf.email} onChange={handleChange} required />
    </div>
  );
};

export default ContactDetails;
