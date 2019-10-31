export class NewSelectQueue {
    queueInfo : any;
    queueMembers: Member[];
    queueSupervisors: Member[];
}

export class Member{
    "objid": string; 
    "loginName": string; 
    "status": string; 
}