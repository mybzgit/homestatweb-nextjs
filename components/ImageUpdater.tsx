"use client";

import { useState } from "react";
import Button from "./form/Button";
import { updateImage } from "@/app/actions";

const ImageUpdater = () => {
  const [showInput, setShowInput] = useState(false);

  if (showInput)
    return <Button onClick={() => setShowInput(true)}>Update image</Button>;
  return (
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
  );
};

export default ImageUpdater
