import React from "react";

const ImageUpload = ({ turf, setTurf }) => {
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setTurf((prev) => ({ ...prev, images: [...prev.images, ...files] }));
  };

  const handleRemoveImage = (index) => {
    setTurf((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  return (
    <div>
      <label>Upload Images:</label>
      <input type="file" multiple accept="image/*" onChange={handleImageChange} />

      {/* Image Preview */}
      <div className="image-preview">
        {turf.images.map((image, index) => (
          <div key={index} className="image-container" >
            <img src={URL.createObjectURL(image)} alt="preview" className="preview-img" style={{height:"100px",width:"150px"}}/>
            <button type="button" className="time-selection" onClick={() => handleRemoveImage(index)}  >❌</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageUpload;
