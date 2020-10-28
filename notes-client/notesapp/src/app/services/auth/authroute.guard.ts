import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router,  RouterStateSnapshot,
    CanActivateChild } from '@angular/router';
import { AuthService } from './auth.service';


@Injectable()
export class AuthRouteGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate( route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['home']);
      return false;
    }
    
    return true;
  }

 
}

