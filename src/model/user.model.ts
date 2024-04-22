export type User = {
    uid: string;
    name: string;
    email: string;
    role: "admin" | "seller" | "buyer";
    department: Department;
}
export enum Department  {
    FE = "front-end",
    UI = "user-interface",
    BE = "backend",
    QA = "quality-assurance",
    UX = "user-experience",
    BA = "business-analyst",
    ADM = "admin-and-HR",
}


export type UserAuth = {
    email: string;
    password: string;
}

export type Userlist = User[];