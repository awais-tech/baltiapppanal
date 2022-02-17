import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: "root",
})
export class ApicallingService {
  constructor(public router: Router,private http:HttpClient) {}
  getorders(): Observable<any> {
    return this.http.get("https://baltiapi.herokuapp.com/orders");
  
  }
  checkLogin(): boolean {
    if (localStorage.getItem("login")) {
      return true;
    }
    return false;
  }

  login() {
    localStorage.setItem("login", "true");
  }

  logout() {
    localStorage.removeItem("login");
    this.router.navigate(["login"]);
  }
}
