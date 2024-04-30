import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {userRequest, userResponse,} from "../types/user-types";


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  login(userRequest: userRequest): Observable<userResponse> {
    return this.http.post<userResponse>('http://localhost:5050/api/v1/users/login', userRequest);
  }

  register(userRequest: userRequest): Observable<userResponse> {
    return this.http.post<userResponse>('http://localhost:5050/api/v1/users/register', userRequest);
  }
}
