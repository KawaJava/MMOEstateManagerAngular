import { Injectable } from "@angular/core";
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { JwtService } from "../service/jwt.service";

@Injectable()
export class AdminAuthorizeGuard implements CanActivate{
    
    constructor(private jwtService: JwtService, private router: Router){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        if(!this.jwtService.getToken()) {
            this.router.navigate(["/admin-login"]);
        }
        return true;
    }

}