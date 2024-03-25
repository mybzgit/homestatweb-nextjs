"use server";

import { getImageVersion } from "@/app/actions";
import ImageUpdater from "./ImageUpdater";

const ImageViewer = async () => {
  const imageVersion = await getImageVersion();
  const imageSrc = `/api/get-image?url=image-${imageVersion}.png`;

  return (
    <div className="flex flex-col items-center gap-4">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={imageSrc}
        width={300}
        height={300}
        alt="Scheme of network"
      />

      <ImageUpdater />
    </div>
  );
};

export default ImageViewer;
