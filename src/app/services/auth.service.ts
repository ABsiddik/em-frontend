import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { jwtDecode } from 'jwt-decode';


export interface JwtPayload {
  sub: string;
  role: string[]; // adjust based on your JWT
  exp: number;
  iat: number;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = `${environment.apiBaseUrl}/auth`;
  constructor(private http: HttpClient, private router: Router) {}

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
      tap((response: any) => {
        
        // Store JWT token
        localStorage.setItem('token', response.token);
      })
    );
  }

  register(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user);
  }

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getRolesFromToken(): string[] {
    try {
      const token = this.getToken();
      if (token) {
        const decoded = jwtDecode<JwtPayload>(token);
        return decoded.role || [];
      }
      else {
        console.error('Empty token');
        return [];
      }
    } catch (error) {
      console.error('Invalid token', error);
      return [];
    }
  }
}
