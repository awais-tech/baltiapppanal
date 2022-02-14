import { Component,ViewChild,AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

export interface OrderElement{
  RestaurentName: string
  orders: number
  status: string
  completions: number
}

const ELEMENT_DATA: OrderElement[]=[{
  RestaurentName: "Burger King", orders: 3, status: "Working", completions:5
},
{
  RestaurentName: "Burger King", orders: 3, status: "Working", completions:5
},
{
  RestaurentName: "Burger King", orders: 3, status: "Working", completions:5
}]
@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.scss']
})


export class TablesComponent implements AfterViewInit{

displayedColumns: string[]= ['RestaurentName', 'orders', 'status', 'completions']
dataSource = new MatTableDataSource(ELEMENT_DATA) ;

@ViewChild(MatPaginator) paginator!:MatPaginator;

ngAfterViewInit(){
  this.dataSource.paginator = this.paginator;
}
}
