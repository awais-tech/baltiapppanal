import { Component} from "@angular/core";
import { ApicallingService } from "../../apicalling.service";
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from "@angular/material/snack-bar";
import { ActivatedRoute, Router } from "@angular/router";
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent{

  loading = true;
  id = "";
  seller = [];

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
      console.log(this.id);
      this.api.ViewIndivisualSeller("id").subscribe((res) => {
        this.seller = res.map((val) => {
          const {
            _id = "s",
            rating = "s",
            owner = "s",
            description = "s",
            email,
          } = val;

          return { _id, rating, owner, description, email };
        });
        if (this.id != "") {
          this.seller = this.seller.filter((val, index) => {
            return val.Uid == this.id;
          });
          this.ELEMENT_DATA.push(...this.seller);
        } else {
          this.ELEMENT_DATA.push(...this.seller);
        }
        console.log(this.seller)
        this.loading = false;
        (err) => {
          this._snackBar.open(err.error.ErrorMessage.message, "close", {
            duration: 3000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
        };
      });
    });
  }
}
