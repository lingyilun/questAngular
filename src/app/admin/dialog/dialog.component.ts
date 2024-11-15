import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
  ],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss'
})
export class DialogComponent {
  readonly dialogRef = inject(MatDialogRef<DialogComponent>);
  readonly data = inject<any>(MAT_DIALOG_DATA);
  // 多選M 單選Q 文字輸入T
  questStats: string = 'Q';
  questArray!: Array<any>;
  questOptionId = 0;
  questName!: string;
  isEdit = false;
  needCheckBox = false;
  saveQuestArray: Array<any> = [];
  questId = 0;
  editId = 0;

  ngOnInit(): void {
    this.saveQuestArray = this.data.saveQuestArray;
    this.isEdit = this.data.isEdit;
    this.questStats = this.data.type;
    this.editId = this.data.editId;
    if (this.isEdit) {
      for (let questArray of this.saveQuestArray) {
        if (questArray.id == this.data.editId) {
          this.questName = questArray.questName;
          this.needCheckBox = questArray.need;
          this.questStats = questArray.questStats;
          this.questArray = questArray.questArray;
        }
      }
    } else {
      for (let questArray of  this.saveQuestArray) {
        this.questId = questArray.id;
      }
      this.questId++;
      if (this.questStats != 'T') this.resertQuestArray();
    }
  }

  resertQuestArray() {
    // 初始設定預設兩個選項
    this.questOptionId = 1;
    this.questArray = [
      { id: 0, quest: '' },
      { id: 1, quest: '' }
    ];
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

  getQuestStatsName(type: string): string {
    if (type == 'M') return '多選';
    if (type == 'Q') return '單選';
    if (type == 'T') return '文字';
    return '';
  }

  changeSelect() {
    if (this.questStats != 'T') {
      this.resertQuestArray();
    }
  }

  cancel() {
    this.dialogRef.close();
  }

  save() {
    this.dialogRef.close();
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
      this.dialogRef.close(this.saveQuestArray);
    } else {
      alert('問卷名稱不能為空');
    }
  }
}
