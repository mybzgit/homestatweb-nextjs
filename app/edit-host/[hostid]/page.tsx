"use server";

import { getHost } from "@/app/actions";
import HostForm from "@/components/HostForm";
import { IHostInfo } from "@/interfaces/types";

const EditHost = async ({ params }: { params: { hostid: string } }) => {
  const { hostid } = params;
  const host = await getHost(hostid);
  return (
    <main>
      <div className="flex flex-col gap-4">
        <div className="text-center font-semibold text-lg">
          Editing host
        </div>
        <HostForm isEdit host={host as IHostInfo} />
      </div>
    </main>
  );
};

export default EditHost;
