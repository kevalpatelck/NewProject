import React, { useState, useEffect } from "react";

const TimeSlotSelection = ({ turf, setTurf }) => {
  const [duration, setDuration] = useState(1);
  const [selectedSlot, setSelectedSlot] = useState({ startTime: "", endTime: "", price: "" });
  const [priceSuggestions, setPriceSuggestions] = useState([]);

  useEffect(() => {
    // If updating an existing turf, pre-fill selected slots
    if (turf.timeSlot && turf.timeSlot.length > 0) {
      setTurf((prevTurf) => ({
        ...prevTurf,
        selectedSlots: turf.timeSlot, // Load existing time slots
      }));
    }
  }, [turf.timeSlot, setTurf]);

  const generateTimeSlots = (duration) => {
    let slots = [];
    let startHour = 0;
    while (startHour < 24) {
      let endHour = startHour + duration;
      if (endHour > 24) break;
      let startLabel = formatTime(startHour);
      let endLabel = formatTime(endHour);
      slots.push({ startTime: startLabel, endTime: endLabel });
      startHour = endHour;
    }
    return slots;
  };

  const formatTime = (hour) => {
    let period = hour < 12 ? "AM" : "PM";
    let formattedHour = hour % 12 === 0 ? 12 : hour % 12;
    return `${formattedHour}:00 ${period}`;
  };

  const slots = generateTimeSlots(duration);

  const handleDurationChange = (e) => {
    setDuration(parseInt(e.target.value));
    setTurf({ ...turf, selectedSlots: [] }); // Reset selected slots
  };

  const handleSlotChange = (e) => {
    const selected = slots.find((slot) => slot.startTime === e.target.value.split(" to ")[0]);
    if (selected) {
      setSelectedSlot({ ...selected, price: "" });

      setPriceSuggestions(duration === 1 ? [1000, 1200, 1300, 2000] : [2100, 2200, 2500, 5000]);
    }
  };

  const handlePriceChange = (e) => {
    setSelectedSlot({ ...selectedSlot, price: e.target.value });
  };

  const handleAddSlot = () => {
    if (selectedSlot.startTime && selectedSlot.endTime && selectedSlot.price) {
      setTurf({
        ...turf,
        selectedSlots: [...turf.selectedSlots.filter(slot => slot.startTime !== selectedSlot.startTime), selectedSlot],
      });
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

      <button type="button" onClick={handleAddSlot}>Add/Update Time Slot</button>

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
