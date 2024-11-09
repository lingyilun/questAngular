import { Component } from '@angular/core';
import Chart from 'chart.js/auto';
import { CountChartComponent } from "./count-chart/count-chart.component";
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-count',
  standalone: true,
  imports: [CountChartComponent, MatButtonModule],
  templateUrl: './count.component.html',
  styleUrl: './count.component.scss'
})
export class CountComponent {
  // 多選M 單選Q 文字輸入T
  questData = {
    questName: '範例問卷標題',
    sDate: '2024/11/06',
    eDate: '2024/12/23',
    quest: [
      { 
        id: '1',
        type: 'M',
        name: '請選擇最喜歡的運動', 
        labels: ['籃球','足球','桌球'],
        data: [3000, 200, 100],
        color: ['red', 'blue', 'green']
      },
      { 
        id: '2',
        type: 'Q',
        name: '請選擇最喜歡的運動員', 
        labels: ['梅西','內馬爾','鈴木一郎'],
        data: [2000, 2100, 1000],
        color: ['red', 'blue', 'green']
      }
      ,
      { 
        id: '3',
        type: 'T',
        name: '你想對他說的話', 
        labels: [],
        data: ['安安你好', '幾歲住哪', '摳尼基挖'],
        color: ['red', 'blue', 'green']
      }
    ]
  }
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  goBack() {
    this.router.navigate(['/list']);
  }
}
