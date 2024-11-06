import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTableComponent } from '../mat-table/mat-table.component';

@Component({
  selector: 'app-questionnaire-list',
  standalone: true,
  imports: [FormsModule,
            MatTableComponent],
  templateUrl: './questionnaire-list.component.html',
  styleUrl: './questionnaire-list.component.scss'
})
export class QuestionnaireListComponent {
  quesName!: string;
  sDate!: string;
  eDate!: string;

  searchBnt() {
    console.log(this.quesName);
    console.log(this.sDate);
    console.log(this.eDate);

  }
}
