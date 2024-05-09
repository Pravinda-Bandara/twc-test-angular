import { Injectable } from '@angular/core';
import {ShowSnackBarUtilService} from "./show-snack-bar-util.service";


@Injectable({
  providedIn: 'root'
})
export class UserValidationUtil {
  constructor(private snackbarService: ShowSnackBarUtilService) {}

  validate(email: string, password: string): boolean {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Email validation
    if (!email.trim()) {
      this.snackbarService.showSnackbar('Email cannot be empty.');
      return false;
    }
    if (!emailPattern.test(email.trim())) {
      this.snackbarService.showSnackbar('Invalid email format.');
      return false;
    }

    // Password validation
    if (!password.trim()) {
      this.snackbarService.showSnackbar('Password cannot be empty.');
      return false;
    }

    return true;
  }
}
