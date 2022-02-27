import { Component, OnInit, ViewChild } from "@angular/core";
import {
  MatColumnDef,
  MatHeaderRowDef,
  MatNoDataRow,
  MatRowDef,
  MatTable,
  MatTableDataSource,
} from "@angular/material/table";

import { MatPaginator } from "@angular/material/paginator";
import { ApicallingService } from "../../apicalling.service";
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from "@angular/material/snack-bar";
import { element } from "protractor";
import { ActivatedRoute, Router } from "@angular/router";
@Component({
  selector: "app-icons",
  templateUrl: "./icons.component.html",
  styleUrls: ["./icons.component.scss"],
})
export class IconsComponent implements OnInit {
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
      this.api.getAllUsers().subscribe((res) => {
        this.order = res.map((val) => {
          console.log(val);
          const {
            email = "s",
            name = "s",
            role = "s",
            Phoneno = "s",
            Address = "hello",
            Uid = "s",
            _id,
          } = val;

          return { name, email, Uid, Phoneno, role, Address, _id };
        });
        if (this.id != "") {
          this.order = this.order.filter((val, index) => {
            return val.Uid == this.id;
          });
          this.ELEMENT_DATA.push(...this.order);
        } else {
          this.ELEMENT_DATA.push(...this.order);
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

  displayedColumns: string[] = [
    "Name",
    "Email",
    "Address",
    "Phoneno",
    "Role",
    "actions",
  ];
  horizontalPosition: MatSnackBarHorizontalPosition = "right";
  verticalPosition: MatSnackBarVerticalPosition = "top";

  ELEMENT_DATA: any[] = [];

  dataSource;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  ViewId(sId) {
    console.warn(sId);
    this.router.navigate(["Resturent/" + sId]);
  }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}
