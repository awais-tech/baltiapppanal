import { Component } from "@angular/core";
import { ApicallingService } from "../../apicalling.service";
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from "@angular/material/snack-bar";
import { ActivatedRoute, Router } from "@angular/router";
@Component({
  selector: "app-user-profile",
  templateUrl: "./user-profile.component.html",
  styleUrls: ["./user-profile.component.scss"],
})
export class UserProfileComponent {
  loading = true;
  id = "";
  seller: any = {};
  collect = "";
  total = 0;
  horizontalPosition: MatSnackBarHorizontalPosition = "right";
  verticalPosition: MatSnackBarVerticalPosition = "top";

  ELEMENT_DATA: any[] = [];

  dataSource;
  constructor(
    public router: Router,
    private route: ActivatedRoute,
    private api: ApicallingService,
    private _snackBar: MatSnackBar
  ) {
    this.loading = true;
    this.route.paramMap.subscribe((params: any) => {
      this.id = params?.get("id") || "";

      // id mistake
      this.api.ViewIndivisualSeller(this.id).subscribe((res) => {
        this.seller = res;
        this.api.ViewProduct().subscribe((res) => {
          this.collect = res.filter((pro) => {
            return pro.createdby == this.id;
          });

          this.total = this.collect.length;
          this.loading = false;
        });
      });

      (err) => {
        this._snackBar.open(err.error.ErrorMessage.message, "close", {
          duration: 3000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
      };
    });
  }
}
