import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ApicallingService } from "src/app/apicalling.service";
import { LoginsroleGuard } from "src/app/loginsrole.guard";

declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}
export const ROUTES: RouteInfo[] = [
  {
    path: "/dashboard",
    title: "Home",
    icon: "ni-tv-2 text-primary",
    class: "",
  },
  {
    path: "/icons",
    title: "Registered Users",
    icon: "ni-planet text-blue",
    class: "",
  },

  {
    path: "/user-profile",
    title: "Seller Detail",
    icon: "ni-single-02 text-yellow",
    class: "",
  },
  {
    path: "/tables",
    title: "Orders ",
    icon: "ni-bullet-list-67 text-red",
    class: "",
  },
  {
    path: "/Resturent",
    title: "Resturents",
    icon: "ni-key-25 text-info",
    class: "",
  },
  {
    path: "/manageproducts",
    title: "Products",
    icon: "ni-bullet-list-67 text-red",
    class: "",
  },
  {
    path: "/Feedback",
    title: "Feedback",
    icon: "ni-key-25 text-info",
    class: "",
  },
  {
    path: "/register",
    title: "Log Out",
    icon: "ni-circle-08 text-pink",
    class: "",
  },
];

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.scss"],
})
export class SidebarComponent implements OnInit {
  public menuItems: any[];
  public isCollapsed = true;

  constructor(private router: Router, public api: ApicallingService) {}

  ngOnInit() {
    this.menuItems = ROUTES.filter((menuItem) => menuItem);
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
    });
  }
  logout() {
    console.log(3);
    this.api.logout();
    console.log(3);
  }
}
