import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, Router } from '@angular/router';
import { UserService } from './services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {

  constructor(public auth: UserService, public router: Router) { }

  canActivate(): boolean {
    if (!this.auth.isLoggedIn) {
      this.router.navigate(['login/1']);
      return false;
    }
    return true;
  }

  canActivateChild(): boolean {
    if (!this.auth.isLoggedIn) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
}
