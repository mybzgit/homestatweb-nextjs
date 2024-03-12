"use client";

import { updateImage } from "@/app/actions";
import schemeImg from "@/data/image.png";
import { useState } from "react";

const ImageViewer = () => {
  const [showInput, setShowInput] = useState(false);
  return (
    <div className="flex flex-col items-center gap-4">
      <img
        src={schemeImg.src}
        width={300}
        height={300}
        alt="Scheme of network"
      />
      {!showInput && (
        <button onClick={() => setShowInput(true)}>Update image</button>
      )}
      {showInput && (
        <form action={updateImage}>
          <input name="schemeImg" type="file" accept="image/png, image/jpeg" />
          <div className="flex flex-row gap-4 items-center mt-4">
            <button type="submit">Update</button>
            <button type="button" onClick={() => setShowInput(false)}>
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default ImageViewer;
