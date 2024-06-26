"use server";

import { IGroup, IHostInfo } from "@/interfaces/types";
import { readFileSync, rename, unlink, writeFileSync } from "fs";
import { revalidatePath } from "next/cache";
import { randomUUID } from "crypto";
import { redirect } from "next/navigation";
import { DropResult } from "react-beautiful-dnd";

const HOSTS_PATH = "public/data/hosts.json";
const GROUPS_PATH = "public/data/groups.json";
const IMAGE_VERSION_PATH = "public/data/image-version.json";

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
  revalidatePath("/");
  redirect("/edit");
}

export async function editGroup(formData: FormData, id: string) {
  const groups = await getGroups();
  const edited = groups.find((g) => g.id == id);
  if (edited !== null && edited !== undefined) {
    edited.name = formData.get("name") as string;
    writeFileSync(GROUPS_PATH, JSON.stringify(groups));
    revalidatePath("/edit");
    revalidatePath("/");
    redirect("/edit");
  }
}

export async function removeGroup(id: string) {
  let groups = await getGroups();
  groups = groups.filter((g) => g.id !== id);
  writeFileSync(GROUPS_PATH, JSON.stringify(groups));
  revalidatePath("/edit");
  revalidatePath("/");
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
  let hosts = await getHosts();
  hosts.filter((h) => h.group_id == groupId).forEach((i) => i.index++);
  hosts.push({
    id: randomUUID(),
    name: formData.get("name") as string,
    url: formData.get("url") as string,
    description: formData.get("description") as string,
    group_id: groupId,
    index: 0,
  });

  writeFileSync(HOSTS_PATH, JSON.stringify(hosts));
  revalidatePath("/edit");
  revalidatePath("/");
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
    revalidatePath("/");
    redirect("/edit");
  }
}

export async function changeIndex(result: DropResult) {
  const hosts = await getHosts();
  const dragged = hosts.find((h) => h.id == result.draggableId);
  const droppedIndex = result.destination?.index;

  let updated = []

  if (dragged !== undefined && droppedIndex !== undefined) {
    const draggedIndex = result.source.index;
    const groupId = dragged.group_id;
    dragged.index = droppedIndex;

    if (draggedIndex < droppedIndex) {
      updated = hosts.map((i) => {
        if (
          i.group_id == groupId &&
          i.index > draggedIndex &&
          i.index <= droppedIndex &&
          i.id != dragged.id
        )
          return {
            ...i,
            index: i.index - 1,
          };
        else return i;
      });
    } else {
      updated = hosts.map((i) => {
        if (
          i.group_id == groupId &&
          i.index < draggedIndex &&
          i.index >= droppedIndex &&
          i.id != dragged.id
        )
          return {
            ...i,
            index: i.index + 1,
          };
        else return i;
      });
    }

    writeFileSync(HOSTS_PATH, JSON.stringify(updated));
    revalidatePath("/");
  }
}

export async function removeHost(id: string) {
  let hosts = await getHosts();
  hosts = hosts.filter((h) => h.id !== id);
  writeFileSync(HOSTS_PATH, JSON.stringify(hosts));
  revalidatePath("/edit");
  revalidatePath("/");
}

export async function getImageVersion() {
  const buffer = readFileSync(IMAGE_VERSION_PATH);
  const bufferString = buffer.toString();
  let version: string;
  if (!bufferString) {
    version = "0";
  }
  version = JSON.parse(bufferString).version;
  return version;
}

export async function updateImage(formData: FormData) {
  const file = formData.get("schemeImg") as File;
  const data = await file.arrayBuffer();
  await writeFileSync(`public/data/test.${file.name}`, Buffer.from(data));

  let version = await getImageVersion();

  unlink(`public/data/image-${version}.png`, (err) => console.log(err));

  version = randomUUID();
  writeFileSync(IMAGE_VERSION_PATH, JSON.stringify({ version }));

  rename(
    `public/data/test.${file.name}`,
    `public/data/image-${version}.png`,
    (err) => console.log(err)
  );
  revalidatePath("/edit");
  revalidatePath("/");
  redirect("/");
}
