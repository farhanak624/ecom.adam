import { CanActivate, Injectable, ExecutionContext, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { UserService } from "src/user/user.service";

@Injectable()
export class RoleGuard implements CanActivate {
    constructor(
        private readonly reflecor: Reflector,
        private readonly userService: UserService
    ) {}
        matchRoles(roles:string[],userRole:string){
            return roles.some(role=>role===userRole)
        }
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const roles = this.reflecor.get('roles', context.getHandler());
        const request: any = context.switchToHttp().getRequest();
        console.log(request.user)
        // Retreive user role from db
        const user = await this.userService.getUserById(request.user.id);
        
        
        // const role = user.role;
        // console.log(user);
        //if (roles.includes(role)) return true;
        if(user.isActive){
        return this.matchRoles(roles,user.role)
        }else{
            throw new UnauthorizedException(" ")
        }
    }
}