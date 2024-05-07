import { Component, OnInit } from '@angular/core';
import { ContactResponse } from "../../types/contact-types";
import { ContactService } from "../../service/contact.service";
import { StoreService } from "../../service/store.service";
import { Router } from '@angular/router';
import {UserValidationUtil} from "../../util/userValidationUtil";
import {ContactValidationUtil} from "../../util/contactValidationUtil";


@Component({
  selector: 'app-contact-list',
  template: `
      <div class="flex justify-center items-center h-screen flex-col p-10 bg-customBlue">
          <div>
              <div class="flex items-center justify-between">
                  <h1 class="font-bold text-4xl text-white">Contacts</h1>
                  <button type="button" class="custom-button w-1/4" (click)="navigateToAddContact()">Add new contact</button>
              </div>
              <div class="rounded-3xl border-2 pb-4 px-12 flex justify-center bg-white">
                  <table>
                      <thead class="px-12">
                      <tr class="text-center">
                          <th class="py-5">Profile</th>
                          <th>Full Name</th>
                          <th>Gender</th>
                          <th>Email</th>
                          <th>Number</th>
                          <th>Actions</th>
                      </tr>
                      </thead>
                      <tbody>
                      <tr *ngFor="let contact of contacts" class="text-center" [attr.key]="contact._id">
                          <td class="w-1/6">
                              <div class="flex justify-center">
                                  <img class="rounded-full h-12 w-12 my-1" [src]="getProfilePicture(contact.gender)" alt="Profile">
                              </div>
                          </td>
                          <ng-container *ngIf="editRow === contact._id; else contactDetails">
                              <td><input type="text" [(ngModel)]="nameEdit"></td>
                              <td><input type="text" [(ngModel)]="genderEdit"></td>
                              <td><input type="text" [(ngModel)]="emailEdit"></td>
                              <td><input type="text" [(ngModel)]="numberEdit"></td>
                              <td>
                                  <button type="button" (click)="handleSave(contact)">Save</button>
                              </td>
                          </ng-container>
                          <ng-template #contactDetails>
                              <td><input type="text" [value]="contact.name" [disabled]="true"></td>
                              <td><input type="text" [value]="contact.gender" [disabled]="true"></td>
                              <td><input type="text" [value]="contact.email" [disabled]="true"></td>
                              <td><input type="text" [value]="contact.number" [disabled]="true"></td>
                              <td>
            <span role="img" aria-label="Edit" class="cursor-pointer m-0.5" (click)="handleEdit(contact)">
                <i class="bi bi-pen-fill text-customBlue hover:text-green-500 mr-2"></i>
            </span>
                                  <span role="img" aria-label="Delete" class="cursor-pointer m-0.5" (click)="handleDelete(contact)">
                <i class="bi bi-trash text-customBlue hover:text-red-500"></i>
            </span>
                              </td>
                          </ng-template>
                      </tr>

                      </tbody>
                  </table>
              </div>
          </div>
          <div class="self-end">
              <div class="float-end flex m-10">
                  <i class="bi bi-box-arrow-left text-2xl text-white"></i>
                  <button class="underline text-white mx-2 text-xl" type="button" (click)="handleLogOut()">LogOut</button>
              </div>
          </div>
      </div>
  `,
  styles: `
     input[type="text"] {
        text-align: center;
    }
  `
})
export class ContactListComponent implements OnInit {
  editRow: any;
  contacts: ContactResponse[] = [];
  userInfo = this.storeService.getUserInfo();

  nameEdit: string = '';
  emailEdit: string = '';
  numberEdit: string = '';
  genderEdit: string = '';

  constructor(
    private contactService: ContactService,
    private storeService: StoreService,
    private router: Router,
    private contactValidationUtil: ContactValidationUtil // Inject ContactValidationUtil service
  ) {}

  ngOnInit(): void {
    this.loadContacts();
  }

  loadContacts(): void {
    this.contactService.getContactList(this.storeService.getUserInfo()).subscribe((contacts) => {
      this.contacts = contacts;
    });
  }

  getProfilePicture(gender: string): string {
    return gender === 'male' ? 'assets/maleProPic.png' : 'assets/femaleProPic.png';
  }

  handleEdit(contact: ContactResponse): void {
    this.editRow = contact._id;
    this.nameEdit = contact.name;
    this.genderEdit = contact.gender;
    this.numberEdit = contact.number;
    this.emailEdit = contact.email;
  }

  handleSave(contact: ContactResponse): void {
    const validationError = this.contactValidationUtil.validate(this.nameEdit, this.numberEdit, this.emailEdit, this.genderEdit);
    if (validationError) {
      return; // Return if validation fails
    }

    const updatedContact: ContactResponse = {
      _id: contact._id,
      name: this.nameEdit,
      gender: this.genderEdit,
      email: this.emailEdit,
      number: this.numberEdit
    };

    this.contactService.updateContact(updatedContact).subscribe(() => {
      // Reload contacts after successful update
      this.loadContacts();
      // Reset editRow to null to exit editing mode
      this.editRow = null;
    });
  }

  handleDelete(contact: ContactResponse): void {
    this.contactService.deleteContact(contact._id).subscribe(() => {
      this.loadContacts();
    });
  }

  handleLogOut(): void {
    this.storeService.UserSignOut();
    localStorage.removeItem('userInfo');
    this.router.navigate(['/login']);
  }

  navigateToAddContact(): void {
    // Navigate to the add contact page
    this.router.navigate(['app/addcontact']);
  }
}
