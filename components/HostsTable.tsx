'use client'

import { createHost, editHost, removeHost } from "@/app/actions";
import { HostInfo } from "@/interfaces/types";

type Props = {
  hosts: HostInfo[];
};

const HostsTable = ({ hosts }: Props) => {
  return (
    <table className="hosts-table">
      <thead>
        <tr>
          <th>IP</th>
          <th>MAC</th>
          <th>URL</th>
          <th>Name</th>
          <th>Wake on LAN</th>
          <th>
            <button onClick={() => createHost()}>create</button>
          </th>
        </tr>
      </thead>
      <tbody>
        {hosts?.map((h: HostInfo) => (
          <tr key={h.macAddr}>
            <td>{h.ipAddr}</td>
            <td>{h.macAddr}</td>
            <td>{h.url}</td>
            <td className="text-center">{h.name}</td>
            <td className="text-center">{h.mayWol ? "Wake up" : "Disabled"}</td>
            <td>
              <button onClick={() => removeHost(h.macAddr)}>remove</button>
              <br/>
              <button onClick={() => editHost(h.macAddr)}>edit</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default HostsTable;
