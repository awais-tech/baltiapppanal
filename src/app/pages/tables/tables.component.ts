import { Component, ViewChild, AfterViewInit, OnInit } from "@angular/core";
import {
  MatColumnDef,
  MatHeaderRowDef,
  MatNoDataRow,
  MatRowDef,
  MatTable,
  MatTableDataSource,
} from "@angular/material/table";
import { ActivatedRoute, Router } from "@angular/router";

import { MatPaginator } from "@angular/material/paginator";
import { ApicallingService } from "../../apicalling.service";
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from "@angular/material/snack-bar";
import { element } from "protractor";

//  interface OrderElement {
//   RestaurentName: string;
//   orders: number;
//   status: string;
//   completions: number;
// }

@Component({
  selector: "app-tables",
  templateUrl: "./tables.component.html",
  styleUrls: ["./tables.component.scss"],
})
export class TablesComponent implements AfterViewInit, OnInit {
  loading = true;
  id = "";
  order = [];
  constructor(
    private api: ApicallingService,
    private _snackBar: MatSnackBar,
    public router: Router,
    private route: ActivatedRoute
  ) {
    this.loading = true;
    this.route.paramMap.subscribe((params: any) => {
      this.id = params?.get("id") || "";
      this.api.getorders().subscribe((res) => {
        res.forEach((element) => {
          this.order = element.UserId.map(
            (val: {
              products?: any;
              amount?: any;
              status?: any;
              dateTime?: any;
              _id?: any;
            }) => {
              const { amount, status, dateTime, _id } = val;
              const { title, quantity, createdby } = val.products[0];

              return {
                amount,
                status,
                dateTime,
                title,
                quantity,
                createdby,
                _id,
              };
            }
          );
          if (this.id != "") {
            this.order = this.order.filter((val, index) => {
              return val._id == this.id;
            });
            this.ELEMENT_DATA.push(...this.order);
          } else {
            this.ELEMENT_DATA.push(...this.order);
          }
        });
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
          this.loading = false;
        };
        this.loading = false;
      });
      this.loading = false;
    });
  }
  statusValue = [
    { value: "complete", viewValue: "Complete" },
    { value: "pending", viewValue: "Pending" },
  ];
  displayedColumns: string[] = [
    "amount",
    "status",
    "dateTime",
    "title",
    "quantity",
    "createdby",
    "actions",
  ];
  horizontalPosition: MatSnackBarHorizontalPosition = "right";
  verticalPosition: MatSnackBarVerticalPosition = "top";

  ELEMENT_DATA: any[] = [];

  dataSource;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  viewSeller(sId: any) {
    console.warn(sId);
    this.router.navigate(["user-profile/" + sId]);
  }
  Delete(dId) {
    console.warn(dId);
    this.api.deleteorder(dId).subscribe((res) => {
      this.ELEMENT_DATA = this.ELEMENT_DATA.filter(
        (val, index) => val._id != dId
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
  applyFilter(select) {
    this.dataSource.filter = select;
  }

  ngOnInit(): void {
    this.dataSource.filterPredicate = (data, filter) =>
      data.status.trim().toLowercase == filter.toLowercase;
    this.dataSource.paginator = this.paginator;
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}
