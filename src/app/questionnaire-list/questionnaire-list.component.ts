import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTableComponent } from '../mat-table/mat-table.component';
import { DateService } from '../../@services/date.service';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-questionnaire-list',
  standalone: true,
  imports: [
    FormsModule,
    MatTableComponent,
    MatButtonModule
  ],
  templateUrl: './questionnaire-list.component.html',
  styleUrl: './questionnaire-list.component.scss'
})
export class QuestionnaireListComponent {
  quesName!: string;
  sDate!: string;
  eDate!: string;
  minDate!: string;
  maxDate!: string;
  eMaxDate!: string;
  ELEMENT_DATA!: any;

  constructor(
    private dateService: DateService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    // 設定選取日期最小值為當天
    this.minDate = this.dateService.changeDateFormat(new Date());
    // 設定選取日期最大值為當天
    this.maxDate = this.dateService.changeDateFormat(this.dateService.addDate(new Date(), 30));
    this.ELEMENT_DATA = ELEMENT_DATA;
  }

  changeSDate() {
    this.eMaxDate = this.dateService.changeDateFormat(this.dateService.addDate(new Date(this.sDate), 30));
  }

  searchBnt() {
    console.log(this.quesName);
    console.log(this.sDate);
    console.log(this.eDate);
  }

  goLogin() {
    this.router.navigate(['/login']);
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
  { id: 3, name: 'A3', statusCode: 'N', status: '未發布', sDate: '2024-11-08', eDate: '2024-12-03', eductId: '3' },
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