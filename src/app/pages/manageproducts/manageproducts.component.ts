import {
  Component,
  ViewChild,
  AfterViewInit,
  OnInit,
  ElementRef,
} from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { ApicallingService } from "../../apicalling.service";
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from "@angular/material/snack-bar";
import {
  MatColumnDef,
  MatHeaderRowDef,
  MatNoDataRow,
  MatRowDef,
  MatTable,
  MatTableDataSource,
} from "@angular/material/table";
import { Router } from "@angular/router";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-manageproducts",
  templateUrl: "./manageproducts.component.html",
  styleUrls: ["./manageproducts.component.css"],
})
export class ProductsComponent implements AfterViewInit, OnInit {
  loading = true;
  Resturents = [];
  products = [];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild("check") selection: any;
  displayedColumns: string[] = [
    "Product Name",
    "Restaurent Name",
    "Category",
    "Price",
    "Created By",
    "actions",
  ];
  horizontalPosition: MatSnackBarHorizontalPosition = "right";
  verticalPosition: MatSnackBarVerticalPosition = "top";

  ELEMENT_DATA: any[] = [];
  id = "";

  dataSource;
  constructor(
    private api: ApicallingService,
    private _snackBar: MatSnackBar,
    public router: Router,
    private route: ActivatedRoute
  ) {
    this.loading = true;
    this.route.paramMap.subscribe((params: any) => {
      this.id = params?.get("id") || "";

      this.api.Resturent().subscribe((res) => {
        this.Resturents = res.map((res: { Name: any }) => res.Name);

        this.api.ViewProduct().subscribe((res) => {
          this.products = res.map((val) => {
            console.log(val);
            const {
              title = "s",
              ResturentName = "s",
              Category = "s",
              price = "s",
              createdby = "hello",
              imageUrl,
              _id,
            } = val;

            return {
              title,
              ResturentName,
              price,
              Category,
              createdby,
              _id,
              imageUrl,
            };
          });

          if (this.id != "") {
            this.products = this.products.filter((val, index) => {
              return val.ResturentName == this.id;
            });

            this.ELEMENT_DATA.push(...this.products);
          } else {
            this.ELEMENT_DATA.push(...this.products);
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
    });
  }

  ViewId(sId) {
    console.warn(sId);
    this.router.navigate(["user-profile/" + sId]);
  }

  applyFilter(select) {
    this.dataSource.filter = select;
  }

  Delete(dId) {
    console.log(dId);
    this.api.deleteProduct(dId).subscribe((res) => {
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
  ngOnInit(): void {
    this.dataSource.filterPredicate = (
      data: {
        status: { trim: () => { (): any; new (): any; toLowercase: any } };
      },
      filter: { toLowercase: any }
    ) => data.status.trim().toLowercase == filter.toLowercase;
    this.dataSource.paginator = this.paginator;
  }
  ngAfterViewInit() {
    if (this.id) {
      console.log(this.selection);
      console.log(this.selection.nativeElement);
      this.selection.nativeElement.innerHTML = this.id;
    }
    this.dataSource.paginator = this.paginator;
  }
}
