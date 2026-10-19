import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);

  login(email: string, password: string) {
    return this.http.post('/api/auth/login', { email, password }, {
      withCredentials: true  // necesario para que el navegador guarde las cookies HttpOnly
    });
  }

  logout() {
    return this.http.post('/api/auth/logout', {}, { withCredentials: true });
  }

  getProfile() {
    return this.http.get('/api/auth/me', { withCredentials: true });
  }
}