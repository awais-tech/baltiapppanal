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
  selector: "app-resturent",
  templateUrl: "./resturent.component.html",
  styleUrls: ["./resturent.component.css"],
})
export class ResturentComponent implements OnInit {
  loading = true;
  id = "";
  resturent = [];
  displayedColumns: string[] = [
    "Id",
    "Name",
    "Image",
    "Description",
    "Actions",
  ];
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
      this.api.Resturent().subscribe((res) => {
        this.resturent = res.map((val) => {
          const {
            _id = "s",
            Name = "s",
            imageUrl = "s",
            description = "s",
            createdby,
          } = val;

          return { _id, Name, imageUrl, description, createdby };
        });
        if (this.id != "") {
          this.resturent = this.resturent.filter((val, index) => {
            return val.createdby == this.id;
          });
          this.ELEMENT_DATA.push(...this.resturent);
        } else {
          this.ELEMENT_DATA.push(...this.resturent);
        }

        this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);

        this.dataSource.paginator = this.paginator;

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

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  viewSeller(sId: any) {
    console.log(sId);
  }
  Delete(dId) {
    console.warn(dId);
    this.api.DeleteResturent(dId).subscribe((res) => {
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

  viewProducts(Rname) {
    this.router.navigate(["manageproducts/" + Rname]);
  }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}
