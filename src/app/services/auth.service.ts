import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

interface LoginResponse {
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://localhost:7212/Auth/authenticate';
  private isBrowser: boolean;

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  login(email: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.apiUrl, { email, password }).pipe(
      tap(response => {
        if (this.isBrowser) {
          localStorage.setItem('jwtToken', response.token);
        }
      })
    );
  }

  logout(): void {
    if (this.isBrowser) {
      localStorage.removeItem('jwtToken');
    }
  }

  getToken(): string | null {
    return this.isBrowser ? localStorage.getItem('jwtToken') : null;
  }

  isLoggedIn(): boolean {
    return this.isBrowser && !!localStorage.getItem('jwtToken');
  }
}
