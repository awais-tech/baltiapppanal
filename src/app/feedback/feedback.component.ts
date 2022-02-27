import { Component, ViewChild, AfterViewInit, OnInit } from "@angular/core";
import {
  MatColumnDef,
  MatHeaderRowDef,
  MatNoDataRow,
  MatRowDef,
  MatTable,
  MatTableDataSource,
} from "@angular/material/table";

import { MatPaginator } from "@angular/material/paginator";
import { ApicallingService } from "../apicalling.service";
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from "@angular/material/snack-bar";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-feedback",
  templateUrl: "./feedback.component.html",
  styleUrls: ["./feedback.component.css"],
})
export class FeedbackComponent implements OnInit {
  loading = true;
  constructor(
    private api: ApicallingService,
    private _snackBar: MatSnackBar,
    public router: Router
  ) {
    this.loading = true;
    this.api.ViewFeedback().subscribe((res) => {
      const order = res.map((val) => {
        console.log(val);
        const {
          description: Description = "No Description",
          rating: Rating = 0,
          UID = "0",
          OID = "0",
          proid = "0",
          Uid = "0",
          owner = "0",
          _id = "0",
          email = "test@gmail.com",
        } = val;

        return { Description, Rating, UID, OID, proid, Uid, owner, _id, email };
      });
      this.ELEMENT_DATA.push(...order);

      this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);

      this.dataSource.paginator = this.paginator;

      this.loading = false;

      (err) => {
        this.loading = false;
        this._snackBar.open(err.error.ErrorMessage.message, "close", {
          duration: 3000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
      };
    });
    this.loading = false;
  }

  displayedColumns: string[] = [
    "Description",
    "Rating",
    "User Email",
    "actions",
  ];
  horizontalPosition: MatSnackBarHorizontalPosition = "right";
  verticalPosition: MatSnackBarVerticalPosition = "top";

  ELEMENT_DATA: any[] = [];

  dataSource;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  ViewUser(sId) {
    this.router.navigate(["icons/" + sId]);
  }
  ViewOrder(sId) {
    this.router.navigate(["tables/" + sId]);
  }
  ViewProduct(sId) {
    this.router.navigate(["manageproducts/" + sId]);
  }
  ViewSeller(sId) {
    this.router.navigate(["user-profile/" + sId]);
  }
  Delete(sId) {
    this.api.DeleteFeedback(sId).subscribe((res) => {
      this.ELEMENT_DATA = this.ELEMENT_DATA.filter(
        (val, index) => val._id != sId
      );
      this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
      this.dataSource.paginator = this.paginator;
      (err) => {
        this._snackBar.open("Something Goes wrong", "close", {
          duration: 3000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
      };
    });
  }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}
