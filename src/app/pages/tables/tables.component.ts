import { Component, ViewChild, AfterViewInit,OnInit} from '@angular/core';
import {  MatColumnDef,
  MatHeaderRowDef,
  MatNoDataRow,
  MatRowDef,
  MatTable,
  MatTableDataSource, } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ApicallingService } from '../../apicalling.service';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

//  interface OrderElement {
//   RestaurentName: string;
//   orders: number;
//   status: string;
//   completions: number;
// }


@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.scss']
})


export class TablesComponent implements AfterViewInit,OnInit {
  displayedColumns: string[] = ['amount', 'status', 'dateTime', 'title', 'quantity', 'createdby'];
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  ELEMENT_DATA: any[] = [];
  constructor(private api: ApicallingService, private _snackBar: MatSnackBar) {
    this.api.getorders().subscribe
    ((res) => {
      res.forEach((element) => {
  
  
      const order = element.UserId.map((val) => {
  
     const {amount, status, dateTime} = val;
    const {title, quantity, createdby} = val.products[0];
  
      return{amount, status, dateTime, title, quantity, createdby };
      }
      );
      this.ELEMENT_DATA.push(...order);
     });
     this.dataSource = new MatTableDataSource(this.ELEMENT_DATA) ;
     this.dataSource.paginator = this.paginator;
     },
     (err) => {this._snackBar.open(err.error.ErrorMessage.message, 'close', {
       duration: 3000, horizontalPosition: this.horizontalPosition, verticalPosition: this.verticalPosition
     }); });
   
   
  }



dataSource ; 

@ViewChild(MatPaginator) paginator!: MatPaginator;

ngOnInit(): void {
  
}
ngAfterViewInit() {
  
   


}
}
