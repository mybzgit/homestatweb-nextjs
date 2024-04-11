"use server";

import HostsDraggableTable from "@/components/HostsDraggableTable";
import { getGroups, getHosts, getImageVersion } from "./actions";

export default async function Home() {
  const dataHosts = await getHosts();
  const dataGroups = await getGroups();
  const imageVersion = await getImageVersion();
  const imageSrc = `/api/get-image?url=image-${imageVersion}.png`;

  return (
    <main>
      <div className="content">
        <HostsDraggableTable hosts={dataHosts} groups={dataGroups} />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="max-w-1/2 w-full md:w-1/2"
          src={imageSrc}
          width={300}
          height={300}
          alt="Scheme of network"
        />
      </div>
    </main>
  );
}
