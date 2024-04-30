import { Component, OnInit } from '@angular/core';
import { UserService } from "../../service/user.service";
import { userResponse } from "../../types/user-types";
import { StoreService } from "../../service/store.service";
import { Router } from "@angular/router";
import { UserValidationUtil } from "../../util/userValidationUtil";
import { take } from "rxjs";

@Component({
  selector: 'app-login',
  template: `
      <div class="flex justify-evenly items-center h-screen bg-fixed-cover-2">
          <div class="p-10">
              <h1 class="text-9xl font-bold text-white mb-4">Hi there,</h1>
              <p class="text-white text-2xl mb-10">
                  Welcome to our <br /> contacts portal
              </p>
              <form>
                  <div>
                      <input type="text"
                             placeholder="Enter user Name"
                      [(ngModel)]="userName"
                      name="userName" class="custom-input">

                  </div>
                  <div>
                      <input type="text"
                             placeholder="Enter password"
                             [(ngModel)]="password"
                             name="userName" class="custom-input">
                  </div>
                  <button (click)="onLogin()" class="custom-button w-1/4">Login</button>
                  <span class="text-white mx-5"> or </span>
                  <button
                          class="underline text-white text-sm mr-7"
                          type="button"
                          (click)="navigateToRegister()"
                  >
                      Click here to Register
                  </button>
              </form>
          </div>
          <app-logo
                  textColor="text-black"
                  imageSize="w-20"
                  textSize="text-5xl"
          ></app-logo>
      </div>
  `,
  styles: [
    // Add Tailwind CSS styles here
  ]
})
export class LoginComponent implements OnInit {
  constructor(
    private userService: UserService,
    private storeService: StoreService,
    private router: Router,
    private userValidationUtil: UserValidationUtil
  ) {}

  ngOnInit() {
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
      this.router.navigate(['app/contacts']);
    }
  }

  userName: string = '';
  password: string = '';

  onLogin() {
    console.log(this.userName,this.password)
    if (!this.userValidationUtil.validate(this.userName, this.password)) {
      return;
    }

    this.userService.login({ userName: this.userName, userPassword: this.password })
      .pipe(take(1))
      .subscribe(
        (response: userResponse) => {
          this.storeService.UserSignIn(response.userId);
          localStorage.setItem('userInfo', JSON.stringify(response.userId));
          this.router.navigate(['app/contacts']);
        },
        (error) => {
          console.error('Login failed:', error);
        }
      );
  }

  navigateToRegister() {
    this.router.navigate(['/register']);
  }
}
