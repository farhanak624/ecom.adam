// Extracts user data like 'id' and exports
import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { request } from "http";

export const GetUser = createParamDecorator((data, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    const user =req.user;
    //console.log(user)
    return data ? user?.[data] : user;
})