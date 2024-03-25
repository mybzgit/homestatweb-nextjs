"use client";

import { updateImage } from "@/app/actions";
import { useState } from "react";
import Button from "./form/Button";

const ImageViewer = () => {
  const [showInput, setShowInput] = useState(false);
  return (
    <div className="flex flex-col items-center gap-4">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/data/image.png"
        width={300}
        height={300}
        alt="Scheme of network"
      />
      {!showInput && (
        <Button onClick={() => setShowInput(true)}>Update image</Button>
      )}
      {showInput && (
        <form action={updateImage}>
          <input name="schemeImg" type="file" accept="image/png, image/jpeg" />
          <div className="flex flex-row gap-4 items-center mt-4">
            <Button type="submit">Update</Button>
            <Button
              className="btn-light"
              type="button"
              onClick={() => setShowInput(false)}
            >
              Cancel
            </Button>
          </div>
        </form>
      )}
    </div>
  );
};

export default ImageViewer;
