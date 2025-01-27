import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { MatSnackBar } from '@angular/material/snack-bar';
import { ContactService } from "../../service/contact.service";
import { StoreService } from "../../service/store.service";
import { Gender } from "../../types/contact-types";
import {ContactValidationUtil} from "../../util/contactValidationUtil";
import {ShowSnackBarUtilService} from "../../util/show-snack-bar-util.service";
import {ErrorUtilService} from "../../util/error-util.service";

@Component({
  selector: 'app-add-contact',
  template: `
      <div class="flex justify-evenly items-center h-screen flex-col bg-fixed-cover p-20">
          <div>
              <app-logo [textColor]="'text-white'" [imageSize]="'w-10'" [textSize]="'text-3xl'"></app-logo>

              <h1 class="text-2xl text-white font-bold py-10">Add Your New Content Here</h1>

              <form (submit)="handleAddContent()" class="grid grid-cols-2 gap-4 items-center">
                  <!-- Input fields for full name, email, phone number -->
                  <div>
                      <input type="text" [(ngModel)]="fullName" name="fullName" placeholder="full name" class="rounded-3xl h-10 py-6 px-8 my-2 mr-5 text-customBlue w-11/12 placeholder-customBlue">
                  </div>
                  <div>
                      <input type="text" [(ngModel)]="email" name="email" placeholder="e-mail" class="rounded-3xl h-10 py-6 px-8 my-2 text-customBlue w-11/12 placeholder-customBlue">
                  </div>
                  <div>
                      <input type="text" [(ngModel)]="phoneNumber" name="phoneNumber" placeholder="phone number" class="rounded-3xl h-10 py-6 px-8 my-2 mr-5 text-customBlue w-11/12 placeholder-customBlue">
                  </div>
                  <div class="flex px-4">
                      <label class="text-white mr-10">Gender:</label>
                      <div>
                          <input type="radio" id="male" name="gender" value="male" [(ngModel)]="gender" required class="w-3">
                          <label for="male" class="text-white px-1 pr-14">Male</label>
                      </div>
                      <div>
                          <input type="radio" id="female" name="gender" value="female" [(ngModel)]="gender" required class="w-3">
                          <label for="female" class="text-white px-1">Female</label>
                      </div>
                  </div>
                  <button type="submit" class="custom-button w-3/5">Add Contact</button>
              </form>
          </div>
          <div class="self-end">
              <div class="float-end flex flex-row-reverse">
                  <button class="underline text-white mx-2 text-xl" type="button" (click)="handleLogOut()">Logout</button>
                  <i class="bi bi-box-arrow-left text-2xl text-white"></i>
                  <button class="underline float-end text-white text-xl px-9" type="button" (click)="navigateToContacts()">Show My Contacts</button>
              </div>
          </div>
      </div>
  `,
  styles: []
})
export class AddContactComponent {
  fullName: string = '';
  email: string = '';
  phoneNumber: string = '';
  gender: string = '';

  constructor(
    private router: Router,
    private contactService: ContactService,
    private storeService: StoreService,
    private contactValidationUtil: ContactValidationUtil,
    private snackbarService: ShowSnackBarUtilService,
  ) { }

  handleAddContent(): void {
    const validationMessage = this.contactValidationUtil.validate(this.fullName, this.phoneNumber, this.email, this.gender);
    if (validationMessage) {
      return;
    }

    // If validation passes, proceed to add contact
    const userId = this.storeService.getUserInfo();

    this.contactService.signup({
      user: userId!,
      name: this.fullName,
      number: this.phoneNumber,
      email: this.email,
      gender: this.gender as Gender
    }).subscribe(
      () => {
        this.snackbarService.showSnackbar('Contact added successfully');
        this.clearForm();
      },
      (error) => {
        this.snackbarService.showSnackbar(error);
      }
    );
  }

  clearForm(): void {
    this.fullName = '';
    this.email = '';
    this.phoneNumber = '';
    this.gender = '';
  }

  handleLogOut(): void {
    this.storeService.UserSignOut();
    localStorage.removeItem('userInfo');
    this.router.navigate(['/login']);
  }

  navigateToContacts(): void {
    this.router.navigate(['app/contacts']);
  }
}
