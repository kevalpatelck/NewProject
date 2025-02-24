import React from "react";

const TurfDetails = ({ turf, setTurf }) => {
  const handleChange = (e) => {
    setTurf({ ...turf, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <label>Name:</label>
      <input type="text" name="name" value={turf.name} onChange={handleChange} required />

      <label>Address Line 1:</label>
      <input type="text" name="address1" value={turf.address1} onChange={handleChange} required />

      <label>Address Line 2:</label>
      <input type="text" name="address2" value={turf.address2} onChange={handleChange} />

      <label>City:</label>
      <input type="text" name="city" value={turf.city} onChange={handleChange} required />

      <label>Landmark:</label>
      <input type="text" name="landmark" value={turf.landmark} onChange={handleChange} />

      <label>Zipcode:</label>
      <input type="text" name="zipcode" value={turf.zipcode} onChange={handleChange} required />
    </div>
  );
};

export default TurfDetails;
