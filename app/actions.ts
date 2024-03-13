"use server";

import { IGroup, IHostInfo } from "@/interfaces/types";
import { readFileSync, rename, unlink, writeFileSync } from "fs";
import { revalidatePath } from "next/cache";
import { randomUUID } from "crypto";
import { redirect } from "next/navigation";

const HOSTS_PATH = "data/hosts.json";
const GROUPS_PATH = "data/groups.json";

export async function getGroups() {
  const groupsBuffer = readFileSync(GROUPS_PATH);
  const groupsString = groupsBuffer.toString();
  if (!groupsString) {
    return [];
  }
  const groups: IGroup[] = JSON.parse(groupsString);
  return groups;
}

export async function getGroup(id: string) {
  const groupsBuffer = readFileSync(GROUPS_PATH);
  const groupsString = groupsBuffer.toString();
  if (!groupsString) {
    return [];
  }
  const groups: IGroup[] = JSON.parse(groupsString);
  return groups.find((g) => g.id == id);
}

export async function createGroup(formData: FormData) {
  const groups = await getGroups();
  groups.push({
    id: randomUUID(),
    name: formData.get("name") as string,
  });
  writeFileSync(GROUPS_PATH, JSON.stringify(groups));
  revalidatePath("/edit");
  redirect("/edit");
}

export async function editGroup(formData: FormData, id: string) {
  const groups = await getGroups();
  const edited = groups.find((g) => g.id == id);
  if (edited !== null && edited !== undefined) {
    edited.name = formData.get("name") as string;
    writeFileSync(GROUPS_PATH, JSON.stringify(groups));
    revalidatePath("/edit");
    redirect("/edit");
  }
}

export async function removeGroup(id: string) {
  let groups = await getGroups();
  groups = groups.filter((g) => g.id !== id);
  writeFileSync(GROUPS_PATH, JSON.stringify(groups));
  revalidatePath("/edit");
}

export async function getHosts() {
  const hostsBuffer = readFileSync(HOSTS_PATH);
  const hostsString = hostsBuffer.toString();
  if (!hostsString) {
    return [];
  }
  const hosts: IHostInfo[] = JSON.parse(hostsString);
  return hosts;
}

export async function getHost(id: string) {
  const hostsBuffer = readFileSync(HOSTS_PATH);
  const hostsString = hostsBuffer.toString();
  if (!hostsString) {
    return [];
  }
  const hosts: IHostInfo[] = JSON.parse(hostsString);
  return hosts.find((h) => h.id == id);
}

export async function createHost(formData: FormData, groupId: string) {
  const hosts = await getHosts();
  hosts.push({
    id: randomUUID(),
    name: formData.get("name") as string,
    url: formData.get("url") as string,
    description: formData.get("description") as string,
    group_id: groupId,
  });
  writeFileSync(HOSTS_PATH, JSON.stringify(hosts));
  revalidatePath("/edit");
  redirect("/edit");
}

export async function editHost(formData: FormData, id: string) {
  const hosts = await getHosts();
  const edited = hosts.find((h) => h.id == id);
  if (edited !== null && edited !== undefined) {
    edited.name = formData.get("name") as string;
    edited.url = formData.get("url") as string;
    edited.description = formData.get("description") as string;
    writeFileSync(HOSTS_PATH, JSON.stringify(hosts));
    revalidatePath("/edit");
    redirect("/edit");
  }
}

export async function removeHost(id: string) {
  let hosts = await getHosts();
  hosts = hosts.filter((h) => h.id !== id);
  writeFileSync(HOSTS_PATH, JSON.stringify(hosts));
  revalidatePath("/edit");
}

export async function updateImage(formData: FormData) {
  const file = formData.get("schemeImg") as File;
  const data = await file.arrayBuffer();
  await writeFileSync(`data/test.${file.name}`, Buffer.from(data));
  unlink("data/image.png", (err) => console.log(err));
  rename(`data/test.${file.name}`, "data/image.png", (err) => console.log(err));
  revalidatePath("/edit");
  redirect("/");
}
