import { Component, OnInit } from '@angular/core';
import { ContactResponse } from "../../types/contact-types";
import { ContactService } from "../../service/contact.service";
import { StoreService } from "../../service/store.service";

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
                          <td>{{ contact.name }}</td>
                          <td>{{ contact.gender }}</td>
                          <td>{{ contact.email }}</td>
                          <td>{{ contact.number }}</td>
                          <td>
                  <span role="img" aria-label="Edit" class="cursor-pointer m-0.5" (click)="handleEdit(contact)">
                    <i class="bi bi-pen-fill text-customBlue hover:text-green-500 mr-2"></i>
                  </span>
                              <span role="img" aria-label="Delete" class="cursor-pointer m-0.5" (click)="handleDelete(contact)">
                    <i class="bi bi-trash text-customBlue hover:text-red-500"></i>
                  </span>
                          </td>
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
    /* Add your custom styles here */
  `
})
export class ContactListComponent implements OnInit {
  contacts: ContactResponse[] = [];

  constructor(private contactService: ContactService, private storeService: StoreService) {}

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
    // Implement edit logic
  }

  handleDelete(contact: ContactResponse): void {
    this.contactService.deleteContact(contact._id).subscribe(() => {
      console.log(contact)
      console.log("asssdasdasdasdadasdad")
      this.loadContacts();
    });
  }

  handleLogOut(): void {
    // Implement logout logic
  }

  navigateToAddContact(): void {
    // Implement navigation to add contact page
  }
}
