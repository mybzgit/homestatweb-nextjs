"use server";

import { getGroup } from "@/app/actions";
import GroupForm from "@/components/GroupForm";

const EditGroup = async ({ params }: { params: { groupid: string } }) => {
  const { groupid } = params;
  const group = await getGroup(groupid);
  return (
    <main>
      <div>edit group {groupid}</div>
      <GroupForm isEdit group={group} />
    </main>
  );
};

export default EditGroup;
