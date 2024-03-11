export interface HostInfo {
    ipAddr: string;
    macAddr: string;
    mayWol: boolean;
    name: string;
    url: string;
}

export interface HostInfoList {
    hostInfoList: HostInfo[];
}