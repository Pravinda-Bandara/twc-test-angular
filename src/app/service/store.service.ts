import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  private userInfo: string | null = JSON.parse(localStorage.getItem('userInfo') || 'null');

  UserSignIn(userId: string): void {
    this.userInfo = userId;
  }

  UserSignOut(): void {
    this.userInfo = null;
  }

  getUserInfo(): string | null {
    return this.userInfo;
  }
}
