export enum Role{
    ADMIN='admin',
    USER='user',
    VENDOR='vendor'
  }
  
type User  ={
    id:string;
    username:string;
    password:string;
    role:Role
}  

export interface IsAuthenticate{
    readonly user:User;
    readonly token:string;
}