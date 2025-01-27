import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { userRequest, userResponse } from "../types/user-types";

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl = 'http://localhost:5050/api/v1/users';

  constructor(private http: HttpClient) {}

  login(userRequest: userRequest): Observable<userResponse> {
    return this.http.post<userResponse>(`${this.baseUrl}/login`, userRequest);
  }

  register(userRequest: userRequest): Observable<userResponse> {
    return this.http.post<userResponse>(`${this.baseUrl}/register`, userRequest);
  }
}
