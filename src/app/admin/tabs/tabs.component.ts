import { QuestService } from './../../../@services/quset.service';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { NavigationEnd, NavigationError, NavigationStart, Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-tabs',
  standalone: true,
  imports: [
    MatTabsModule,
    RouterOutlet,
    CommonModule,
    RouterLink
  ],
  templateUrl: './tabs.component.html',
  styleUrl: './tabs.component.scss'
})
export class TabsComponent {
  links = [
    { path: '/tabs-admin/add', name: '問卷' },
    { path: '/tabs-admin/add-option', name: '題目' },
    { path: '/tabs-admin/feedbook', name: '問卷回饋' },
    { path: '/tabs-admin/count', name: '統計' },
    { path: '/list-admin', name: '回列表' },
  ]
  activeLink = this.links[0].name;
  tabPanel!: any;

  constructor(
    private router: Router,
    private questService: QuestService,
  ) {
    // 抓取路由變換
    this.router.events.subscribe((event: any) => {
      // 當變換結束(End)抓取路由的url去做判斷別請更改tabs選項
      if (event instanceof NavigationEnd) {
        for (let link of this.links) {
          if (link.path == event.url) {
            this.activeLink = link.name;
          }
        }
      }
    });
  }

  // P:尚未開始 E:已結束 N:未發布 S:進行中
  // 判斷頁籤是否要鎖定
  checkStats(path: string): boolean {
    if (this.questService.questState == 'P' || this.questService.questState == 'N') {
      if (path == '/tabs-admin/feedbook' || path == '/tabs-admin/count') return true;
    } else if (this.questService.questState == 'E' || this.questService.questState == 'S') {
      if (path == '/tabs-admin/add' || path == '/tabs-admin/add-option') return true;
    } else if(this.questService.questState = 'ADD'){
      if (path == '/tabs-admin/feedbook' || path == '/tabs-admin/count'|| path == '/tabs-admin/add-option') return true;
    }
    return false;
  }
}
