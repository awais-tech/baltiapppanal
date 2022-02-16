import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ApicallingService } from './apicalling.service';

@Injectable({
  providedIn: 'root'
})
export class LoginsroleGuard implements CanActivate {
  constructor(public api:ApicallingService){

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(this.api.checkLogin()){
        return true;
  
      }
    return false;
  }
  
}
