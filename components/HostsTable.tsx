"use client";

import {
  removeGroup,
  removeHost
} from "@/app/actions";
import { IGroup, IHostInfo } from "@/interfaces/types";
import Link from "next/link";
import { Fragment } from "react";

type Props = {
  hosts: IHostInfo[];
  groups: IGroup[];
};

const HostsTable = ({ hosts, groups }: Props) => {
  return (
    <div className="flex flex-col gap-4">
      <table className="hosts-table">
        <tbody>
          {groups?.map((g) => {
            const hostsByGroup = hosts.filter((h) => h.group_id == g.id);
            return (
              <Fragment key={g.id}>
                <tr>
                  <td colSpan={3}>{g.name}</td>
                  <td className="flex flex-row gap-2">
                    <Link href={`/edit-group/${g.id}`}>Rename group</Link>
                    <button onClick={() => removeGroup(g.id)}>
                      Delete group
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>Name</td>
                  <td>URL</td>
                  <td>Description</td>
                  <td>
                    <Link href={`/create-host/${g.id}`}>Add host</Link>
                  </td>
                </tr>

                {hostsByGroup?.map((h: IHostInfo) => (
                  <tr key={h.id}>
                    <td className="text-center">{h.name}</td>
                    <td>{h.url}</td>
                    <td>{h.description}</td>
                    <td className="flex flex-row gap-2">
                      <button onClick={() => removeHost(h.url)}>Delete</button>
                      <Link href={`/edit-host/${h.id}`}>Edit</Link>
                    </td>
                  </tr>
                ))}
              </Fragment>
            );
          })}
        </tbody>
      </table>
      <Link href={`/create-group`}>Add group</Link>
    </div>
  );
};

export default HostsTable;
