"use server";

import { getGroup } from "@/app/actions";
import GroupForm from "@/components/GroupForm";
import { IGroup } from "@/interfaces/types";

const EditGroup = async ({ params }: { params: { groupid: string } }) => {
  const { groupid } = params;
  const group = await getGroup(groupid);
  return (
    <main>
      <div className="flex flex-col gap-4">
        <div className="text-center font-semibold text-lg">Editing group</div>
        <GroupForm isEdit group={group as IGroup} />
      </div>
    </main>
  );
};

export default EditGroup;
