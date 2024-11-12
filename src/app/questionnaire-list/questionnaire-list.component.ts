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

  constructor(
    private dateService: DateService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    // 設定選取日期最小值為當天
    this.minDate = this.dateService.changeDateFormat(new Date());
    // 設定選取日期最大值為當天
    this.maxDate = this.dateService.changeDateFormat(this.dateService.addDate(new Date(), 30));
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
