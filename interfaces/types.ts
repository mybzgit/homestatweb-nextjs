export interface IHostInfo {
  id: string;
  name: string;
  url: string;
  description: string;
  group_id: string;
}

export interface IHostInfoList {
  hostInfoList: IHostInfo[];
}

export interface IGroup {
  id: string;
  name: string;
}
