import HostForm from "@/components/HostForm";

const CreateHost = ({ params }: { params: { groupid: string } }) => {
  const { groupid } = params;

  return (
    <main>
      <div>create host {groupid}</div>
      <HostForm groupId={groupid} />
    </main>
  );
};

export default CreateHost;
