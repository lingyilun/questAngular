import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { DateService } from '../../../../@services/date.service';
import { QuestService } from '../../../../@services/quset.service';

@Component({
  selector: 'app-add-quest',
  standalone: true,
  imports: [
    MatButtonModule,
    FormsModule,
  ],
  templateUrl: './add-quest.component.html',
  styleUrl: './add-quest.component.scss'
})
export class AddQuestComponent {
  questName!: string;
  questExplain!: string;
  sDate!: string;
  eDate!: string;
  minDate!: string;
  maxDate!: string;
  eMaxDate!: string;

  constructor(
    private dateService: DateService,
    private router: Router,
    private questService: QuestService,
  ) {}

  ngOnInit(): void {
    // 設定選取日期最小值為當天
    this.minDate = this.dateService.changeDateFormat(new Date());
    // 設定選取日期最大值為當天
    this.maxDate = this.dateService.changeDateFormat(this.dateService.addDate(new Date(), 30));
    if (this.questService.questData?.title) {
      this.questName = this.questService.questData.title;
      this.sDate = this.questService.questData.sDate;
      this.eDate = this.questService.questData.eDate;
      this.questExplain = this.questService.questData.explain;
    }
  }

  changeSDate() {
    this.eMaxDate = this.dateService.changeDateFormat(this.dateService.addDate(new Date(this.sDate), 30));
  }

  goNextTab() {
    this.questService.questData = {
      title: this.questName,
      sDate: this.sDate,
      eDate: this.eDate,
      explain: this.questExplain
    }
    this.router.navigate(['/tabs-admin/add-option']);
  }
}
