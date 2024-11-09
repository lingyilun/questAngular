import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-mat-table',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    CommonModule,
    RouterLink
  ],
  templateUrl: './mat-table.component.html',
  styleUrl: './mat-table.component.scss'
})
export class MatTableComponent implements AfterViewInit {

  displayedColumns: string[] = ['id', 'name', 'status', 'sDate', 'eDate', 'eductId'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {

  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    console.log(this.dataSource.paginator);

    this.dataSource.paginator._intl.itemsPerPageLabel = "請選擇每頁顯示數量";
  }

}

export interface PeriodicElement {
  id: number;
  name: string;
  status: string;
  sDate: string;
  eDate: string;
  eductId: string;
  statusCode: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { id: 1, name: 'A1', statusCode: 'P', status: '尚未開始', sDate: '2024-11-05', eDate: '2024-12-01', eductId: '1' },
  { id: 2, name: 'A2', statusCode: 'E', status: '已結束', sDate: '2024-11-06', eDate: '2024-12-02', eductId: '2' },
  { id: 3, name: 'A3', statusCode: 'E', status: '已結束', sDate: '2024-11-08', eDate: '2024-12-03', eductId: '3' },
  { id: 4, name: 'A4', statusCode: 'E', status: '已結束', sDate: '2024-11-15', eDate: '2024-12-04', eductId: '4' },
  { id: 5, name: 'B1', statusCode: 'S', status: '進行中', sDate: '2024-11-05', eDate: '2024-12-05', eductId: '5' },
  { id: 6, name: 'B2', statusCode: 'E', status: '已結束', sDate: '2024-11-07', eDate: '2024-12-06', eductId: '6' },
  { id: 7, name: 'B3', statusCode: 'S', status: '進行中', sDate: '2024-11-11', eDate: '2024-12-07', eductId: '7' },
  { id: 8, name: 'B4', statusCode: 'E', status: '已結束', sDate: '2024-11-01', eDate: '2024-12-08', eductId: '8' },
  { id: 9, name: 'C1', statusCode: 'P', status: '尚未開始', sDate: '2024-11-02', eDate: '2024-12-09', eductId: '9' },
  { id: 10, name: 'C2', statusCode: 'S', status: '進行中', sDate: '2024-11-20', eDate: '2024-12-10', eductId: '10' },
  { id: 11, name: 'C3', statusCode: 'P', status: '尚未開始', sDate: '2024-11-19', eDate: '2024-12-11', eductId: '11' },
  { id: 12, name: 'C4', statusCode: 'S', status: '進行中', sDate: '2024-11-05', eDate: '2024-12-12', eductId: '12' },
  { id: 13, name: 'C5', statusCode: 'P', status: '尚未開始', sDate: '2024-11-11', eDate: '2024-12-13', eductId: '13' },
];
