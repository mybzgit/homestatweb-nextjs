import GroupForm from "@/components/GroupForm";

const CreateGroup = () => {
  return (
    <main>
      <div className="flex flex-col gap-4">
        <div className="text-center font-semibold text-lg">
          Create new group
        </div>
        <GroupForm />
      </div>
    </main>
  );
};

export default CreateGroup;
