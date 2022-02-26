import { Component, ViewChild, AfterViewInit, OnInit} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { ApicallingService } from '../../apicalling.service';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import {  MatColumnDef,
  MatHeaderRowDef,
  MatNoDataRow,
  MatRowDef,
  MatTable,
  MatTableDataSource, } from '@angular/material/table';
import { RouterModule, Routes } from '@angular/router';


import { element } from 'protractor';

@Component({
  selector: 'app-manageproducts',
  templateUrl: './manageproducts.component.html',
  styleUrls: ['./manageproducts.component.css']
})

export class ProductsComponent implements AfterViewInit, OnInit {
  loading=true;
  constructor(private api: ApicallingService, private _snackBar: MatSnackBar) {
    this.loading=true;
    this.api.ViewProduct().subscribe
    ((res) => {
    


      const order = res.map((val) => {
console.log(val);
     const {title="s", ResturentName="s", Category="s",price="s",createdby="hello",_id} = val;
  

      return{title, ResturentName,price, Category ,createdby,_id};
      }
      );
      this.ELEMENT_DATA.push(...order);
  
     this.dataSource = new MatTableDataSource(this.ELEMENT_DATA) ;

     this.dataSource.paginator = this.paginator;
    
     this.loading=false;
     (err) => {this._snackBar.open(err.error.ErrorMessage.message, 'close', {
       duration: 3000, horizontalPosition: this.horizontalPosition, verticalPosition: this.verticalPosition
     });};});


  }

  displayedColumns: string[] = ['Product Name', 'Restaurent Name', 'Category', 'Price', 'Created By', 'actions'];
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  ELEMENT_DATA: any[] = [];

dataSource ;

@ViewChild(MatPaginator) paginator!: MatPaginator;
ViewId(sId) {
  console.warn(sId);
}


ngOnInit(): void {
  this.dataSource.paginator = this.paginator;

}
ngAfterViewInit() {
  this.dataSource.paginator = this.paginator;



}
}

