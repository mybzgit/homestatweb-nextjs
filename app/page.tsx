"use server";

import HostsTable from "@/components/HostsTable";
import { getGroups, getHosts } from "./actions";
import ImageViewer from "@/components/ImageViewer";

export default async function Home() {
  const dataHosts = await getHosts();
  const dataGroups = await getGroups();

  return (
    <main>
      <div className="content">
        <HostsTable hosts={dataHosts} groups={dataGroups} />
        <ImageViewer />
      </div>
    </main>
  );
}
