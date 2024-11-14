import { QuestService } from './../../../../@services/quset.service';
import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-add-quest-option',
  standalone: true,
  imports: [
    FormsModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './add-quest-option.component.html',
  styleUrl: './add-quest-option.component.scss'
})
export class AddQuestOptionComponent {
  questName!: string;
  needCheckBox: boolean = false;
  // 多選M 單選Q 文字輸入T
  questStats: string = 'Q';
  questArray!: Array<any>;
  saveQuestArray: Array<any> = [];
  questId = 0;
  questOptionId = 0;
  isEdit = false;
  editId = 0;

  constructor(
    private router: Router,
    private questService: QuestService,
  ) { }

  ngOnInit(): void {
    if (this.questService.questData.questArray) {
      this.tridyData();
    }
    this.resertQuestArray();
  }

  resertQuestArray() {
    // 初始設定預設兩個選項
    this.questOptionId = 1;
    this.questArray = [
      { id: 0, quest: '' },
      { id: 1, quest: '' }
    ];
  }

  tridyData() {
    for (let quest of this.questService.questData.questArray) {
      let newQuestArray = [];
      for (let option of quest.options) {
        newQuestArray.push({
          quest: option.optionName,
          id: option.code
        })
      }

      this.saveQuestArray.push({
        id: quest.questId,
        questName: quest.questName,
        need: quest.need,
        checkBox: false,
        questStats: quest.type,
        questStatsName: this.getQuestStatsName(quest.type),
        questArray: newQuestArray
      });
    }
  }

  resertQuest() {
    this.questName = '';
    this.needCheckBox = false;
  }

  changeSelect() {
    if (this.questStats == 'T') {
      this.resertQuestArray();
    }
  }

  rmQuest(index: number) {
    if (this.questArray.length > 1) {
      this.questArray.splice(index, 1);
    }
  }

  addQuest() {
    this.questOptionId++;
    this.questArray.push(
      { id: this.questOptionId, quest: '' }
    );
  }

  saveQuest() {
    if (this.questName) {
      let questStatsName = this.getQuestStatsName(this.questStats);

      if (this.questStats != 'T') {
        for (let questArray of this.questArray) {
          if (questArray.quest.length == 0) {
            alert('選項名稱不能為空');
            return;
          }
        }
      }

      // 判斷不是編輯(!this.isEdit)執行新增(push)
      // 判斷是編輯(this.isEdit)執行資料更新
      if (!this.isEdit) {
        this.saveQuestArray.push({
          id: this.questId,
          questName: this.questName,
          need: this.needCheckBox,
          checkBox: false,
          questStats: this.questStats,
          questStatsName: questStatsName,
          questArray: this.questArray
        });
        this.questId++;
      } else {
        let editData;
        for (let quest of this.saveQuestArray) {
          if (quest.id == this.editId) editData = quest;
        }
        editData.questName = this.questName;
        editData.questStats = this.questStats;
        editData.questStatsName = questStatsName;
        editData.questArray = this.questArray;
        editData.need = this.needCheckBox;
        this.isEdit = false;
      }
      // 資料新增完後將資料重置與塞進service中
      this.resertQuest();
      this.resertQuestArray();
      this.pushQuestArrat();
    } else {
      alert('問卷名稱不能為空');
    }
  }

  del() {
    // 判斷如果當前選項有溝選擇選擇刪除
    for (let i = 0; i < this.saveQuestArray.length; i++) {
      if (this.saveQuestArray[i].checkBox) this.saveQuestArray.splice(i, 1);
    }
    this.pushQuestArrat();
  }

  getQuestStatsName(type: string): string {
    if (type == 'M') return '多選';
    if (type == 'Q') return '單選';
    if (type == 'T') return '文字';
    return '';
  }

  edit(quset: any) {
    this.questName = quset.questName;
    this.needCheckBox = quset.need;
    this.questStats = quset.questStats;
    this.questArray = quset.questArray;
    this.editId = quset.id;
    this.isEdit = true;
  }

  pushQuestArrat() {
    let newQuestArray = [];
    for (let quest of this.saveQuestArray) {
      let newOption = [];
      for (let array of quest.questArray) {
        newOption.push({
          optionName: array.quest,
          code: array.id
        })
      }
      newQuestArray.push({
        questId: quest.id,
        need: quest.need,
        questName: quest.questName,
        type: quest.questStats,
        options: newOption
      })
    }

    let quest = {
      title: this.questService.questData.title,
      sDate: this.questService.questData.sDate,
      eDate: this.questService.questData.eDate,
      explain: this.questService.questData.explain,
      questArray: newQuestArray
    }

    this.questService.questData = quest;
  }

  goPreview() {
    this.pushQuestArrat();
    this.router.navigate(['/questionnaire']);
  }
}