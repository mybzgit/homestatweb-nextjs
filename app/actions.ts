"use server";

import { HostInfo } from "@/interfaces/types";
import { readFileSync, writeFileSync } from "fs";
import { revalidatePath } from "next/cache";

export async function getHosts() {
  const hostsBuffer = readFileSync("lib/hosts.json");
  const hostsString = hostsBuffer.toString();
  if (!hostsString) {
    return [];
  }
  const hosts: HostInfo[] = JSON.parse(hostsString);
  return hosts;
}

export async function createHost() {
  const hosts = await getHosts();
  hosts.push({
    ipAddr: "123.123.123.123",
    macAddr: "test",
    name: "test" + new Date().getSeconds().toString(),
    url: "test",
    mayWol: true,
  });
  writeFileSync("lib/hosts.json", JSON.stringify(hosts));
  revalidatePath("/");
}

export async function editHost(mac: string) {
  const hosts = await getHosts();
  const edited = hosts.find((h) => h.macAddr == mac);
  if (edited !== null && edited !== undefined) {
    edited.name = new Date().getSeconds().toString();
    writeFileSync("lib/hosts.json", JSON.stringify(hosts));
    revalidatePath("/");
  }
}

export async function removeHost(mac: string) {
  let hosts = await getHosts();
  hosts = hosts.filter((h) => h.macAddr !== mac);
  writeFileSync("lib/hosts.json", JSON.stringify(hosts));
  revalidatePath("/");
}
