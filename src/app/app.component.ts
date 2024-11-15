import { UserService } from './../@services/user.service';
import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { LoadingService } from '../@services/loading.service';
import { CommonModule } from '@angular/common';
import { DialogComponent } from './admin/dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,MatProgressSpinnerModule,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'dynamicQuestionnaire';
  loading$!: any;
  isAdmin = false;
  readonly dialog = inject(MatDialog);
  
  constructor(
    private loadingService: LoadingService,
    private userService: UserService,
  ) {}

  ngOnInit(): void {
    this.isAdmin = this.userService.isAdmin;
    this.loading$ = this.loadingService.loading$;
  }

  ngDoCheck() {
    this.isAdmin = this.userService.isAdmin;
    
  }
}
