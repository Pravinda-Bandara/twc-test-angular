import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {StoreService} from "../../service/store.service";


@Component({
  selector: 'app-welcome',
  template: `
      <div class="flex justify-evenly items-center h-screen flex-col bg-fixed-cover ">
          <div class="p-10">
              <app-logo textColor="text-white" imageSize="w-10" textSize="text-3xl"></app-logo>
              <h1 class="font-bold text-4xl my-5 my-10 text-white mb-5 mt-14">Welcome</h1>
              <p class="text-white text-3xl">This is where your contacts will live. Click the button below to add
                  a new contact.</p>
              <button (click)="navigateToAddContact()" type="button" class="custom-button">Add First Contact</button>
          </div>
          <div class="self-end flex mr-10">
              <i class="bi bi-box-arrow-left text-2xl text-white"></i>
              <button class="underline text-lg float-end text-white mx-2 text-xl mb-10" type="button" (click)="handleLogOut()">Logout</button>
          </div>
      </div>
  `,
  styles: []
})
export class WelcomeComponent implements OnInit {
  constructor(private router: Router, private storeService: StoreService) {}

  ngOnInit(): void {
    const userInfo = localStorage.getItem('userInfo');
    if (!userInfo) {
      this.router.navigateByUrl('/login');
    }
  }

  handleLogOut(): void {
    this.storeService.UserSignOut();
    localStorage.removeItem('userInfo');
    this.router.navigateByUrl('/login');
  }

  navigateToAddContact(): void {
    this.router.navigateByUrl('/app/addcontact');
  }
}
