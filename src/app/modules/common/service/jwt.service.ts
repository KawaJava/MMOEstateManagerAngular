import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';


@Injectable({
  providedIn: 'root'
})
export class JwtService {

  constructor(private http: HttpClient) { }

  setToken(token: string) {
    localStorage.setItem("token", token);
  }

  getToken(): string | null {
    return localStorage.getItem("token");
  }

  isLoggedIn(): boolean {
    let token = localStorage.getItem("token");
    return token != null && this.notExpired(token);
  }

  private notExpired(token: string): boolean {
    const tokenDecoded = jwtDecode<any>(token);
    return (tokenDecoded.exp * 1000) > new Date().getTime();
  }

  logout(): Observable<any> {
    const token = localStorage.getItem("token");
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.post("/api/auth/logout", {}, { headers });
  }
  
}
