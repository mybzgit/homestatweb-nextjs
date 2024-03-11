'use server'

import LeftNavigation from "@/components/LeftNavigation";
import HostsTable from "@/components/HostsTable";
import { getHosts } from "./actions";
import { useEffect, useState } from "react";
import { HostInfo } from "@/interfaces/types";

export default async function Home() {
  // const [data, setData] = useState<HostInfo[]>([]);

  const data = await getHosts();

  // useEffect(() => {
  //   const fetchHosts = async() => {
  //     const data = await getHosts();
  //     setData(data);
  //   };
  //   console.log('test')
  //   fetchHosts();
  // }, []);
  return (
    <main>
      <LeftNavigation />
      <div className="content">
        <HostsTable hosts={data} />
      </div>
    </main>
  );
}
