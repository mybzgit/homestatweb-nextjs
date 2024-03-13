import HostForm from "@/components/HostForm";

const CreateHost = ({ params }: { params: { groupid: string } }) => {
  const { groupid } = params;

  return (
    <main>
      <div className="flex flex-col gap-4">
        <div className="text-center font-semibold text-lg">Create new host</div>
        <HostForm groupId={groupid} />
      </div>
    </main>
  );
};

export default CreateHost;
