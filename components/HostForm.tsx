"use client";

import { createHost, editHost } from "@/app/actions";
import { IHostInfo } from "@/interfaces/types";
import Link from "next/link";
import { useCallback } from "react";

type Props = {
  isEdit?: boolean;
  host?: IHostInfo;
  groupId?: string;
};

const HostForm = ({ isEdit = false, host, groupId }: Props) => {
  
  const onSubmit = useCallback(
    (formData: FormData) => {
      if (isEdit) editHost(formData, host!.id);
      else createHost(formData, groupId!);
    },
    [isEdit, groupId, host?.id]
  );

  return (
    <form action={onSubmit} className="flex flex-col gap-2">
      <label htmlFor="name">
        <span className="mr-2 w-[100px] inline-block text-end">Name:</span>
        <input type="text" id="name" name="name" defaultValue={host?.name} />
      </label>

      <label htmlFor="url">
        <span className="mr-2 w-[100px] inline-block text-end">URL:</span>
        <input type="text" id="url" name="url" defaultValue={host?.url} />
      </label>

      <label htmlFor="description">
        <span className="mr-2 w-[100px] inline-block text-end">
          Description:
        </span>
        <input
          type="text"
          id="description"
          name="description"
          defaultValue={host?.description}
        />
      </label>

      <div className="flex flex-row justify-end gap-2">
        <button type="submit">Save</button>
        <Link href='/'>Cancel</Link>
      </div>
    </form>
  );
};

export default HostForm;
