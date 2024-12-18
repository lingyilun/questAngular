import { QuestService } from './../../@services/quset.service';
import { UserService } from './../../@services/user.service';
import { SelectionModel } from '@angular/cdk/collections';
import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, Input, output, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-mat-table',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    CommonModule,
    RouterLink,
    MatCheckboxModule,
    FormsModule
  ],
  templateUrl: './mat-table.component.html',
  styleUrl: './mat-table.component.scss'
})
export class MatTableComponent implements AfterViewInit {
  @Input() ELEMENT_DATA!: PeriodicElement[];
  displayedColumns: string[] = ['id', 'name', 'status', 'sDate', 'eDate', 'eductId'];
  dataSource = new MatTableDataSource<PeriodicElement>(this.ELEMENT_DATA);
  selection = new SelectionModel<PeriodicElement>(true, []);
  selectData = output<any[]>()
  isAdmin = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private router: Router,
    private userService: UserService,
    private questService: QuestService,
  ) { }

  ngOnInit(): void {
    this.isAdmin = this.userService.isAdmin
    if (this.isAdmin) {
      this.displayedColumns.unshift('select');
    }
  }

  // 判斷內容變更觸發修改內容
  // checkBox多選重置
  ngOnChanges() {
    this.dataSource.data = this.ELEMENT_DATA;
    this.selection.clear();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.paginator._intl.itemsPerPageLabel = "請選擇每頁顯示數量";
    this.dataSource.data = this.ELEMENT_DATA;
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
    this.outputData();
  }

  goCount(element: any) {
    if (element.statusCode == 'E') {
      this.router.navigate(['/count']);
    }
  }

  outputData() {
    let checkData: Array<any> = [];
    this.selection.selected.forEach(s => checkData.push(s));
    this.selectData.emit(checkData);
  }

  goQuestionnaire(element: any) {
    if (this.isAdmin) {
      this.questService.questState = element.statusCode;
      this.questService.questData = SERVICE_DATA;
      // P:尚未開始 E:已結束 N:未發布 S:進行中
      if (this.questService.questState == 'P' || this.questService.questState == 'N') {
        this.router.navigate(['/tabs-admin/add']);
      } else if (this.questService.questState == 'E' || this.questService.questState == 'S') {
        this.router.navigate(['/tabs-admin/feedbook']);
      }
    } else if (element.statusCode == 'S') {
      this.router.navigate(['/questionnaire']);
    }
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


const SERVICE_DATA = {
  title: "問卷名稱",
  sDate: "2024-11-19",
  eDate: "2024-11-29",
  explain: "問卷說明",
  questArray: [
    {
        "questId": 0,
        "need": false,
        "questName": "問題1",
        "type": "Q",
        "options": [
            {
                "optionName": "aa",
                "code": 0
            },
            {
                "optionName": "bb",
                "code": 1
            }
        ]
    },
    {
        "questId": 1,
        "need": true,
        "questName": "問題2",
        "type": "M",
        "options": [
            {
                "optionName": "cc",
                "code": 0
            },
            {
                "optionName": "dd",
                "code": 1
            }
        ]
    },
    {
        "questId": 2,
        "need": false,
        "questName": "問題3",
        "type": "T",
        "options": [
            {
                "optionName": "",
                "code": 0
            },
            {
                "optionName": "",
                "code": 1
            }
        ]
    }
  ],
};