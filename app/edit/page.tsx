"use server";

import HostsTable from "@/components/HostsTable";
import ImageViewer from "@/components/ImageViewer";
import Link from "next/link";
import { getGroups, getHosts } from "../actions";

export default async function EditPage() {
  const dataHosts = await getHosts();
  const dataGroups = await getGroups();

  return (
    <main>
      <div className="content">
        <Link className="link w-max" href="/">
          {"< "}Back
        </Link>
        <HostsTable hosts={dataHosts} groups={dataGroups} editable />
        <ImageViewer />
      </div>
    </main>
  );
}
