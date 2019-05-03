import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthguardGuard implements CanActivate {
  constructor(private router: Router) {}
  // tslint:disable-next-line: max-line-length
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (localStorage.getItem('token')) {
      return true;
    } else {
      this.router.navigate(['landing-page/log-in']);
    }
  }
}
