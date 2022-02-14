import { Component,ViewChild,AfterViewInit } from '@angular/core';
import {  MatColumnDef,
  MatHeaderRowDef,
  MatNoDataRow,
  MatRowDef,
  MatTable,
  MatTableDataSource, } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

 interface OrderElement{
  RestaurentName: string
  orders: number
  status: string
  completions: number
}


@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.scss']
})


export class TablesComponent implements AfterViewInit{

displayedColumns: string[]= ['RestaurentName', 'orders', 'status', 'completions']
 ELEMENT_DATA: OrderElement[]=[{
  RestaurentName: "Burger King", orders: 3, status: "Working", completions:5
},
{
  RestaurentName: "Burger King", orders: 3, status: "Working", completions:5
},
{
  RestaurentName: "Burger King", orders: 3, status: "Working", completions:5
},
{
  RestaurentName: "Burger King", orders: 3, status: "Working", completions:5
},
{
  RestaurentName: "Burger King", orders: 3, status: "Working", completions:5
},
{
  RestaurentName: "Burger King", orders: 3, status: "Working", completions:5
},
{
  RestaurentName: "Burger King", orders: 3, status: "Working", completions:5
}]
dataSource = new MatTableDataSource(this.ELEMENT_DATA) ;

@ViewChild(MatPaginator) paginator!:MatPaginator;

ngAfterViewInit(){
  this.dataSource.paginator = this.paginator;
}
}
