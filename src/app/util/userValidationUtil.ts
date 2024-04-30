import { MatSnackBar } from '@angular/material/snack-bar';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserValidationUtil {
  constructor(private snackBar: MatSnackBar) {}

  validate(email: string, password: string): boolean {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Email validation
    if (!email.trim()) {
      this.showSnackbar('Email cannot be empty.');
      return false;
    }
    if (!emailPattern.test(email.trim())) {
      this.showSnackbar('Invalid email format.');
      return false;
    }

    // Password validation
    if (!password.trim()) {
      this.showSnackbar('Password cannot be empty.');
      return false;
    }

    return true; // Return true if all validations pass
  }

  private showSnackbar(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000 // Duration in milliseconds
    });
  }
}
