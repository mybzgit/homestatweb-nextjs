"use client";

import { createGroup, editGroup } from "@/app/actions";
import { IGroup } from "@/interfaces/types";
import Link from "next/link";
import { useCallback } from "react";
import Button from "./Button";
import LinkButton from "./LinkButton";

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
        <span className="label">Name:</span>
        <input type="text" id="name" name="name" defaultValue={group?.name} />
      </label>

      <div className="flex flex-row justify-end gap-2">
        <Button type="submit">Save</Button>
        <LinkButton className='btn-light' href='/edit'>Cancel</LinkButton>
      </div>
    </form>
  );
};

export default GroupForm;
