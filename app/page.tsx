"use server";

import HostsTable from "@/components/HostsTable";
import schemeImg from "@/data/image.png";
import Image from "next/image";
import { getGroups, getHosts } from "./actions";

export default async function Home() {
  const dataHosts = await getHosts();
  const dataGroups = await getGroups();

  return (
    <main>
      <div className="content">
        <HostsTable hosts={dataHosts} groups={dataGroups} />
        <Image
          className="max-w-1/2 w-full md:w-1/2"
          src={schemeImg}
          alt="Scheme of network"
        />
      </div>
    </main>
  );
}
