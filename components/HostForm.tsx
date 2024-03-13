"use client";

import { createHost, editHost } from "@/app/actions";
import { IHostInfo } from "@/interfaces/types";
import { useCallback } from "react";
import Button from "./Button";
import LinkButton from "./LinkButton";

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
        <span className="label">Name:</span>
        <input type="text" id="name" name="name" defaultValue={host?.name} />
      </label>

      <label htmlFor="url">
        <span className="label">URL:</span>
        <input type="text" id="url" name="url" defaultValue={host?.url} />
      </label>

      <label htmlFor="description">
        <span className="label">Description:</span>
        <textarea
          rows={3}
          id="description"
          name="description"
          defaultValue={host?.description}
        />
      </label>

      <div className="flex flex-row justify-end gap-2">
        <Button type="submit">Save</Button>
        <LinkButton className="btn-light" href="/edit">
          Cancel
        </LinkButton>
      </div>
    </form>
  );
};

export default HostForm;
