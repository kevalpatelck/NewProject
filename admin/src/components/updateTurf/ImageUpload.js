import React from "react";

const ImageUpload = ({ turf, setTurf }) => {
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setTurf((prev) => ({
      ...prev,
      images: [...prev.images, ...files],
    }));
  };

  const handleRemoveImage = (index, isExisting) => {
    if (isExisting) {
      // Remove from existing image URLs
      setTurf((prev) => ({
        ...prev,
        images: prev.images.filter((_, i) => i !== index),
      }));
    } else {
      // Remove from newly added images
      setTurf((prev) => ({
        ...prev,
        newImages: prev.newImages.filter((_, i) => i !== index),
      }));
    }
  };

  return (
    <div>
      <label>Upload Images:</label>
      <input type="file" multiple accept="image/*" onChange={handleImageChange} />

      {/* Existing Image Preview (from URLs) */}
      {turf.images.length > 0 && (
        <div>
          <h4>Existing Images:</h4>
          <div className="image-preview">
            {turf.images.map((image, index) => (
              <div key={index} className="image-container">
                <img
                  src={typeof image === "string" ? image : URL.createObjectURL(image)}
                  alt="preview"
                  className="preview-img"
                  style={{ height: "100px", width: "150px" }}
                />
                <button type="button" className="remove-btn" onClick={() => handleRemoveImage(index, true)}>
                  ❌
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
