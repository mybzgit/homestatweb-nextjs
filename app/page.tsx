"use server";

import HostsTable from "@/components/HostsTable";
import { getGroups, getHosts, getImageVersion } from "./actions";

export default async function Home() {
  const dataHosts = await getHosts();
  const dataGroups = await getGroups();
  const imageVersion = await getImageVersion();
  const imageSrc = `/api/get-image?url=image-${imageVersion}.png`;

  return (
    <main>
      <div className="content">
        <HostsTable hosts={dataHosts} groups={dataGroups} />
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
