import { Component, ElementRef, Input, input, ViewChild } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-count-chart',
  standalone: true,
  imports: [],
  templateUrl: './count-chart.component.html',
  styleUrl: './count-chart.component.scss'
})
export class CountChartComponent {
  @Input() dataId!: string;
  @Input() questData!: any;
  
  constructor() { }

  ngOnInit(): void {
  }

  // 因為需要抓取頁面標籤所以需要使用ngAfterViewInit這個生命週期
  // 這個生命週期為當頁面渲染結束後才會觸發
  ngAfterViewInit(): void {
    this.createPie();
    console.log(this.questData);
    
  }

  createPie() {
    // 獲取 canvas 元素
    let ctx = document.getElementById(this.dataId) as HTMLCanvasElement;
    console.log(ctx);
    
    // 設定數據
    let data = {
      // x 軸文字
      labels: this.questData.labels,
      datasets: [
        {
          // 數據
          data: this.questData.data,
          // 線與邊框顏色
          backgroundColor: this.questData.color,
          //設定hover時的偏移量，滑鼠移上去表會偏移，方便觀看選種的項目
          hoverOffset: 4,
        },
      ],
    };

    // 創建圖表
    let chart = new Chart(ctx, {
      //pie是圓餅圖,doughnut是環狀圖
      type: 'pie',
      data: data,
    });
  }
}
