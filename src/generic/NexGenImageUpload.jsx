import React, { useState } from "react";
import { CameraIcon } from "@heroicons/react/24/solid";

export default function NexGenImageUpload() {
  const [image, setImage] = useState({ preview: "", raw: "" });

  const handleImageChange = (e) => {
    if (e.target.files.length) {
      setImage({
        preview: URL.createObjectURL(e.target.files[0]),
        raw: e.target.files[0],
      });
    }
  };

  const handleImageUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", image.row);

    await fetch("YOUR_URL", {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      body: formData,
    });
  };

  return (
    <>
      <label htmlFor="upload-button">
        {image.preview ? (
          <img src={image.preview} alt="dummy" width="80" height="80" />
        ) : (
          <>
            <h5 className="text-center">
              <CameraIcon />
              Upload
            </h5>
          </>
        )}
      </label>
      <input
        type="file"
        id="upload-button"
        style={{ display: "none" }}
        onChange={handleImageChange}
      />
      <br />
    </>
  );
}
