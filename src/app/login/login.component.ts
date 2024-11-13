import { UserService } from './../../@services/user.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule, 
    MatIconModule,
    MatFormFieldModule,
    CommonModule,
    MatInputModule,
    FormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  showPassword = false;
  account!: string;
  password!: string;

  constructor(
    private router: Router,
    private userService: UserService,
  ) {}

  changePasswordIcon() {
    this.showPassword = !this.showPassword;
  }

  login() {
    this.userService.isAdmin = true;
    this.router.navigate(['/list-admin']);
  }
}
