import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { QuestService } from '../../../../@services/quset.service';
import { UserService } from '../../../../@services/user.service';

@Component({
  selector: 'app-preview',
  standalone: true,
  imports: [
    FormsModule,
    MatIconModule
  ],
  templateUrl: './preview.component.html',
  styleUrl: './preview.component.scss'
})
export class PreviewComponent {
  questData!: any;
  isAdmin = false;

  constructor(
    private questService: QuestService,
    private router: Router,
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    this.isAdmin = this.userService.isAdmin;
    this.questData = this.questService.questData;
  }

  adminGoBack() {
    this.router.navigate(['/tabs-admin/feedbook']);
  }

  goBack() {
    this.router.navigate(['/questionnaire']);
  }

  goList() {
    // 儲存成功後記得將Service中的資料清空避免資料錯誤
    this.questService.questData = null; 
    this.router.navigate(['/list']);
  }
}
