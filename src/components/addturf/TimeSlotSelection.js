import React, { useState } from "react";

const TimeSlotSelection = ({ turf, setTurf }) => {
  const [duration, setDuration] = useState(1);
  const [selectedSlot, setSelectedSlot] = useState({ startTime: "", endTime: "", price: "" });
  const [priceSuggestions, setPriceSuggestions] = useState([]);

  // Generate time slots dynamically based on duration
  const generateTimeSlots = (duration) => {
    let slots = [];
    let hourStep = duration;
    let startHour = 0;

    while (startHour < 24) {
      let endHour = startHour + hourStep;
      if (endHour > 24) break;
      let startLabel = formatTime(startHour);
      let endLabel = formatTime(endHour);
      slots.push({ startTime: startLabel, endTime: endLabel });
      startHour = endHour;
    }
    return slots;
  };

  // Format time for AM/PM
  // const formatTime = (hour) => {
  //   let period = hour < 12 ? "AM" : "PM";
  //   let formattedHour = hour % 12 === 0 ? 12 : hour % 12;
  //   return `${formattedHour < 10 ? "0" + formattedHour : formattedHour}${period}`;
  // };
// Format time for AM/PM with minutes (HH:MM AM/PM)
const formatTime = (hour) => {
  let period = hour < 12 ? "AM" : "PM";
  let formattedHour = hour % 12 === 0 ? 12 : hour % 12;
  return `${formattedHour}:00 ${period}`;  // Adds ":00" to display full hour
};

  const slots = generateTimeSlots(duration);
  const prices = duration === 1 ? [500, 600, 700] : [1000, 1200, 1300];

  // Handle duration change
  const handleDurationChange = (e) => {
    setDuration(parseInt(e.target.value));
    setTurf({ ...turf, selectedSlots: [] }); // Reset selected slots
  };

  

  const handleSlotChange = (e) => {
    const selected = slots.find(slot => slot.startTime === e.target.value.split(" to ")[0]);
    if (selected) {
      setSelectedSlot({ ...selected, price: "" });
  
      // Generate price suggestions based on duration
      if (duration === 1) {
        setPriceSuggestions([1000, 1200, 1300, 2000]);
      } else if (duration === 2) {
        setPriceSuggestions([2100, 2200, 2500, 5000]);
      }
    }
  };


  // Handle price selection
  const handlePriceChange = (e) => {
    setSelectedSlot({ ...selectedSlot, price: e.target.value });
  };

  // Add the selected slot to the turf state
  const handleAddSlot = () => {
    if (selectedSlot.startTime && selectedSlot.endTime && selectedSlot.price) {
      setTurf({ ...turf, selectedSlots: [...turf.selectedSlots, selectedSlot] });
      setSelectedSlot({ startTime: "", endTime: "", price: "" }); // Reset after adding
    }
  };

  return (
    <div>
      <label>Select Duration:</label>
      <select value={duration} onChange={handleDurationChange}>
        <option value={1}>1 Hour</option>
        <option value={2}>2 Hours</option>
      </select>

      <label>Select Time Slot:</label>
      <select onChange={handleSlotChange} value={selectedSlot.startTime ? `${selectedSlot.startTime} to ${selectedSlot.endTime}` : ""}>
        <option value="">Select Slot</option>
        {slots.map((slot, index) => (
          <option key={index} value={`${slot.startTime} to ${slot.endTime}`}>
            {slot.startTime} to {slot.endTime}
          </option>
        ))}
      </select>

      <label>Enter Price:</label>
<input
  type="text"
  placeholder="Enter Price"
  value={selectedSlot.price}
  onChange={handlePriceChange}
  list="price-options"
/>

<datalist id="price-options">
  {priceSuggestions.map((price, index) => (
    <option key={index} value={price} />
  ))}
</datalist>

      {/* <select value={selectedSlot.price} onChange={handlePriceChange}>
        {prices.map((price, index) => (
          <option key={index} value={price}>{price}</option>
        ))}
      </select> */}


      <button type="button" onClick={handleAddSlot}>Add Time Slot</button>

      {/* Display selected slots */}
      {turf.selectedSlots.length > 0 && (
        <div>
          <h4>Selected Time Slots:</h4>
          <ul>
            {turf.selectedSlots.map((slot, index) => (
              <li key={index}>
                {slot.startTime} to {slot.endTime} - ₹{slot.price}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default TimeSlotSelection;
