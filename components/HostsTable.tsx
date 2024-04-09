"use client";

import { removeGroup, removeHost } from "@/app/actions";
import { IGroup, IHostInfo } from "@/interfaces/types";
import Link from "next/link";
import { Fragment } from "react";
import Button from "./form/Button";
import LinkButton from "./form/LinkButton";
import EditIcon from "./icons/EditIcon";
import TrashIcon from "./icons/TrashIcon";

type Props = {
  hosts: IHostInfo[];
  groups: IGroup[];
  editable?: boolean;
};

const HostsTable = ({ hosts, groups, editable = false }: Props) => {
  return (
    <table className="hosts-table">
      {editable && (
        <thead>
          <tr>
            <th className="header-cell" colSpan={3}>
              Group Name
            </th>

            <th className="header-cell">
              <LinkButton href={`/create-group`}>Add group</LinkButton>
            </th>
          </tr>
        </thead>
      )}
      <tbody>
        {groups?.map((g) => {
          const hostsByGroup = hosts
            .filter((h) => h.group_id == g.id)
            .sort((a, b) => a.index - b.index);
          return (
            <Fragment key={g.id}>
              <tr className="group-row">
                <td colSpan={3}>{g.name}</td>
                {editable && (
                  <td className="flex flex-row gap-2">
                    <LinkButton href={`/edit-group/${g.id}`}>Rename</LinkButton>
                    <Button className="btn" onClick={() => removeGroup(g.id)}>
                      Delete
                    </Button>
                  </td>
                )}
              </tr>

              {editable && (
                <tr>
                  <td className="header-cell">Name</td>
                  <td className="header-cell">URL</td>
                  <td className="header-cell">Description</td>
                  {editable && (
                    <td className="header-cell text-center">
                      <LinkButton href={`/create-host/${g.id}`}>
                        + Host
                      </LinkButton>
                    </td>
                  )}
                </tr>
              )}

              {hostsByGroup?.map((h: IHostInfo, index) => (
                <tr key={h.id}>
                  <td className="text-center font-medium">{h.name}</td>
                  <td>
                    <Link className="underline" href={h.url} target="_blank">
                      {h.url}
                    </Link>
                  </td>
                  <td>{h.description}</td>
                  {editable && (
                    <td className="flex flex-row gap-2 justify-center">
                      <Button onClick={() => removeHost(h.url)}>
                        <TrashIcon className="h-5" />
                      </Button>
                      <LinkButton href={`/edit-host/${h.id}`}>
                        <EditIcon className="h-5" />
                      </LinkButton>
                    </td>
                  )}
                </tr>
              ))}

              {hostsByGroup?.length == 0 && (
                <tr>
                  <td className="text-center" colSpan={editable ? 4 : 3}>
                    No data
                  </td>
                </tr>
              )}
            </Fragment>
          );
        })}
      </tbody>
    </table>
  );
};

export default HostsTable;
