import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ContactValidationUtil {

  constructor(private snackBar: MatSnackBar) { }

  validate(name: string, number: string, email: string, gender: string): string {
    if (name.trim() === '') {
      this.showSnackbar('Name cannot be empty');
      return 'Name cannot be empty';
    }

    if (!/^[\d\s+-]+$/.test(number.trim())) {
      this.showSnackbar('Number must be a valid number');
      return 'Number must be a valid number';
    }

    // Regular expression for validating email format
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email.trim())) {
      this.showSnackbar('Invalid email format');
      return 'Invalid email format';
    }

    if (gender !== 'male' && gender !== 'female') {
      this.showSnackbar('Gender must be either "male" or "female"');
      return 'Gender must be either "male" or "female"';
    }

    return ''; // Return empty string if all validations pass
  }

  private showSnackbar(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000 // Duration in milliseconds
    });
  }
}
