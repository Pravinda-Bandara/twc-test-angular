import { Injectable } from '@angular/core';
import {ShowSnackBarUtilService} from "./show-snack-bar-util.service";


@Injectable({
  providedIn: 'root'
})
export class ContactValidationUtil {

  constructor(private snackbarService: ShowSnackBarUtilService) { }

  validate(name: string, number: string, email: string, gender: string): string {
    if (name.trim() === '') {
      this.snackbarService.showSnackbar('Name cannot be empty');
      return 'Name cannot be empty';
    }

    if (!/^[\d\s+-]+$/.test(number.trim())) {
      this.snackbarService.showSnackbar('Number must be a valid number');
      return 'Number must be a valid number';
    }

    // Regular expression for validating email format
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email.trim())) {
      this.snackbarService.showSnackbar('Invalid email format');
      return 'Invalid email format';
    }

    if (gender !== 'male' && gender !== 'female') {
      this.snackbarService.showSnackbar('Gender must be either "male" or "female"');
      return 'Gender must be either "male" or "female"';
    }

    return '';
  }
}
