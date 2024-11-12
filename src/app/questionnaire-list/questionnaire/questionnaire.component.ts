import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { Router } from '@angular/router';
import { QuestService } from '../../../@services/quset.service';

@Component({
  selector: 'app-questionnaire',
  standalone: true,
  imports: [
    FormsModule,
    MatRadioModule,
    MatCheckboxModule,
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './questionnaire.component.html',
  styleUrl: './questionnaire.component.scss'
})
export class QuestionnaireComponent {
  // 多選M 單選Q 文字輸入T
  quest = {
    title: '範例問卷標題',
    sDate: '2024/11/06',
    eDate: '2024/12/23',
    explain: '問卷說明問卷說明問卷說明問卷說明問卷說明問卷說明\
              問卷說明問卷說明問卷說明問卷說明問卷說明問卷說明\
              問卷說明問卷說明問卷說明問卷說明問卷說明問卷說明\
              問卷說明問卷說明問卷說明問卷說明問卷說明問卷說明',
    questArray: [
      {
        questId: 1,
        need: true,
        questName: '請選擇最喜歡的運動',
        type: 'M',
        options: [
          { optionName: '籃球', code: 'A' },
          { optionName: '足球', code: 'B' },
          { optionName: '桌球', code: 'C' },
        ]
      },
      {
        questId: 2,
        need: true,
        questName: '請選擇最喜歡的運動員',
        type: 'Q',
        options: [
          { optionName: '梅西', code: 'A' },
          { optionName: '內馬爾', code: 'B' },
          { optionName: '鈴木一郎', code: 'C' },
        ]
      },
      {
        questId: 3,
        need: false,
        questName: '請輸入你想跟他們說的話',
        type: 'T',
        options: []
      },
      {
        questId: 4,
        need: false,
        questName: '請選擇最喜歡的運動員2',
        type: 'Q',
        options: [
          { optionName: '梅西', code: 'A' },
          { optionName: '內馬爾', code: 'B' },
          { optionName: '鈴木一郎', code: 'C' },
        ]
      },
      {
        questId: 5,
        need: true,
        questName: '請選擇最喜歡的運動2',
        type: 'M',
        options: [
          { optionName: '籃球', code: 'A' },
          { optionName: '足球', code: 'B' },
          { optionName: '桌球', code: 'C' },
        ]
      },
    ]
  }

  newQuestArray: Array<any> = [];
  radioData!: string;
  ngclassBoolean = false;
  userName!: string;
  userPhone!: string;
  userEmail!: string;
  userAge!: string;

  constructor(
    private questService: QuestService,
    private router: Router,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    // 當我們判斷service中沒有這個資料 就等於不是從預覽回來需要重新組合資料
    if (!this.questService.questData) {
      this.tidyQuestArray();
    } else {
      // 當有資料的話就要將使用者的資料塞進欄位
      this.userName = this.questService.questData.userName;
      this.userPhone = this.questService.questData.userPhone;
      this.userEmail = this.questService.questData.userEmail;
      this.userAge = this.questService.questData.userAge;
      this.newQuestArray = this.questService.questData.questArray;
    }
  }

  tidyQuestArray() {
    // 在每一筆資料裡面加入兩個欄位answer跟radioAnswer
    // 分別拿來給文字輸入(answer)跟單選(radioAnswer)放他的答案
    for (let array of this.quest.questArray) {
      this.newQuestArray.push({ ...array, answer: '', radioAnswer: '' });
      // 上者等於下者寫法
      // this.newQuestArray.push({ 
      //   questId: array.questId,
      //   need: array.need,
      //   questName: array.questName,
      //   type: array.type,
      //   options: array.options, 
      //   answer: '', 
      //   radioAnswer: '' });
    }

    // 在問題的選擇中加入boxBoolean讓checkbox去進行資料綁定
    for (let newArray of this.newQuestArray) {
      let options = [];
      for (let option of newArray.options) {
        options.push({ ...option, boxBoolean: false });
      }
      newArray.options = options;
    }
  }

  goPreview() {
    // 判斷完必填都結束後將資料打包並換頁
    if (this.checkNeed()) {
      this.questService.questData = {
        title: this.quest.title,
        sDate: this.quest.sDate,
        eDate: this.quest.eDate,
        explain: this.quest.explain,
        userName: this.userName,
        userPhone: this.userPhone,
        userEmail: this.userEmail,
        userAge: this.userAge,
        questArray: this.newQuestArray
      }
      console.log(this.questService.questData );
      
      this.router.navigate(['/preview']);
    };
  }

  checkNeed(): boolean {
    if (!this.userName || !this.userPhone) {
      alert('請確認必填皆有填寫');
      return false;
    };

    for (let quest of this.newQuestArray) {
      if (quest.need) {
        // 多選M 單選Q 文字輸入T
        if (quest.type == 'M') {
          let check = false;
          for (let option of quest.options) {
            if (option.boxBoolean) {
              check = true;
            }
          }

          if (!check) {
            alert('請確認必填皆有填寫');
            return false;
          }

        } else if (quest.type == 'Q') {
          if (!quest.radioAnswer) {
            alert('請確認必填皆有填寫');
            return false;
          }
        } else if (quest.type == 'T') {
          if (!quest.answer) {
            alert('請確認必填皆有填寫');
            return false;
          }
        }
      }
    }
    return true;
  }

  goBack() {
    this.router.navigate(['/list']);
  }
}
