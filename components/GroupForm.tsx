"use client";

import { createGroup, editGroup } from "@/app/actions";
import { IGroup } from "@/interfaces/types";
import Link from "next/link";
import { useCallback } from "react";

type Props = {
  isEdit?: boolean;
  group?: IGroup;
};

const GroupForm = ({ isEdit = false, group }: Props) => {

  const onSubmit = useCallback(
    (formData: FormData) => {
      if (isEdit) editGroup(formData, group!.id);
      else createGroup(formData);
    },
    [isEdit, group?.id]
  );
  return (
    <form action={onSubmit} className="flex flex-col gap-2">
      <label htmlFor="name">
        <span className="mr-2 w-[100px] inline-block text-end">Name:</span>
        <input type="text" id="name" name="name" defaultValue={group?.name} />
      </label>

      <div className="flex flex-row justify-end gap-2">
        <button type="submit">Save</button>
        <Link href='/'>Cancel</Link>
      </div>
    </form>
  );
};

export default GroupForm;
