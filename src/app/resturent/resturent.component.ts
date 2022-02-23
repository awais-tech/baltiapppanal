import { Component, ViewChild, AfterViewInit, OnInit} from '@angular/core';
import {  MatColumnDef,
  MatHeaderRowDef,
  MatNoDataRow,
  MatRowDef,
  MatTable,
  MatTableDataSource, } from '@angular/material/table';

import { MatPaginator } from '@angular/material/paginator';
import { ApicallingService } from '../apicalling.service';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Component({
  selector: 'app-resturent',
  templateUrl: './resturent.component.html',
  styleUrls: ['./resturent.component.css']
})
export class ResturentComponent implements OnInit {

  loading=true;
  constructor(private api: ApicallingService, private _snackBar: MatSnackBar) {
    this.loading=true;
    this.api.Resturent().subscribe
    ((res) => {
    


      const resturent = res.map((val) => {

     const {_id="s", Name="s", imageUrl="s",description="s"} = val;
  

      return{_id, Name, imageUrl,description};
      }
      );
      this.ELEMENT_DATA.push(...resturent);
  
     this.dataSource = new MatTableDataSource(this.ELEMENT_DATA) ;

     this.dataSource.paginator = this.paginator;
    
     this.loading=false;
     (err) => {this._snackBar.open(err.error.ErrorMessage.message, 'close', {
       duration: 3000, horizontalPosition: this.horizontalPosition, verticalPosition: this.verticalPosition
     });};});


  }

  displayedColumns: string[] = ['Id', 'Name', 'Image', 'Description'];
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  ELEMENT_DATA: any[] = [];

dataSource ;

@ViewChild(MatPaginator) paginator!: MatPaginator;
viewSeller(sId: any) {
    console.warn(sId);
  }
Delete(dId) {
  console.warn(dId);
}


ngOnInit(): void {
  this.dataSource.paginator = this.paginator;

}
ngAfterViewInit() {
  this.dataSource.paginator = this.paginator;



}
}
