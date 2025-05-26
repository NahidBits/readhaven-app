import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgIf } from '@angular/common';  // <-- import NgIf
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterModule,
    NgIf  // <-- add NgIf here so *ngIf works in template
  ],
  templateUrl: './app.component.html'
})
export class AppComponent {
  pageTitle = 'ReadHaven';
  isAuthenticated = false;

  constructor(private authService: AuthService) {
    this.isAuthenticated = this.authService.isLoggedIn();
  }

  logout() {
    this.authService.logout();
    this.isAuthenticated = false;
  }
}
