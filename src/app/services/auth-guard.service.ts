import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
  constructor() {}

  canActivate(): boolean {
    return true;
    // if (sessionStorage.getItem('user')) {
    //   return true;
    // }
    // this.loginService.signWithGoogle();
    // return false;
  }
}
