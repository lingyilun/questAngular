import { QuestService } from './../../../../@services/quset.service';
import { Router } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'app-feedbook',
  standalone: true,
  imports: [],
  templateUrl: './feedbook.component.html',
  styleUrl: './feedbook.component.scss'
})
export class FeedbookComponent {
  questArray = [
    { questName: '彎彎', questTime: '2024/11/13 17:35' },
    { questName: '橘子', questTime: '2024/11/01 07:15' },
    { questName: '嚕嚕', questTime: '2024/11/05 12:35' },
  ]

  constructor(
    private router: Router,
    private questService: QuestService,
  ) { }

  goPreview() {
    this.questService.questData = {
      "title": "範例問卷標題",
      "sDate": "2024/11/06",
      "eDate": "2024/12/23",
      "explain": "問卷說明問卷說明問卷說明問卷說明問卷說明問卷說明              問卷說明問卷說明問卷說明問卷說明問卷說明問卷說明              問卷說明問卷說明問卷說明問卷說明問卷說明問卷說明              問卷說明問卷說明問卷說明問卷說明問卷說明問卷說明",
      "userName": "Allen",
      "userPhone": "09312313",
      "questArray": [
        {
          "questId": 1,
          "need": true,
          "questName": "請選擇最喜歡的運動",
          "type": "M",
          "options": [
            {
              "optionName": "籃球",
              "code": "A",
              "boxBoolean": true
            },
            {
              "optionName": "足球",
              "code": "B",
              "boxBoolean": false
            },
            {
              "optionName": "桌球",
              "code": "C",
              "boxBoolean": false
            }
          ],
          "answer": "",
          "radioAnswer": ""
        },
        {
          "questId": 2,
          "need": true,
          "questName": "請選擇最喜歡的運動員",
          "type": "Q",
          "options": [
            {
              "optionName": "梅西",
              "code": "A",
              "boxBoolean": false
            },
            {
              "optionName": "內馬爾",
              "code": "B",
              "boxBoolean": false
            },
            {
              "optionName": "鈴木一郎",
              "code": "C",
              "boxBoolean": false
            }
          ],
          "answer": "",
          "radioAnswer": "B"
        },
        {
          "questId": 3,
          "need": false,
          "questName": "請輸入你想跟他們說的話",
          "type": "T",
          "options": [],
          "answer": "TES",
          "radioAnswer": ""
        },
        {
          "questId": 4,
          "need": false,
          "questName": "請選擇最喜歡的運動員2",
          "type": "Q",
          "options": [
            {
              "optionName": "梅西",
              "code": "A",
              "boxBoolean": false
            },
            {
              "optionName": "內馬爾",
              "code": "B",
              "boxBoolean": false
            },
            {
              "optionName": "鈴木一郎",
              "code": "C",
              "boxBoolean": false
            }
          ],
          "answer": "",
          "radioAnswer": "A"
        },
        {
          "questId": 5,
          "need": true,
          "questName": "請選擇最喜歡的運動2",
          "type": "M",
          "options": [
            {
              "optionName": "籃球",
              "code": "A",
              "boxBoolean": false
            },
            {
              "optionName": "足球",
              "code": "B",
              "boxBoolean": true
            },
            {
              "optionName": "桌球",
              "code": "C",
              "boxBoolean": true
            }
          ],
          "answer": "",
          "radioAnswer": ""
        }
      ]
    };
    this.router.navigate(['/preview']);
  }
}