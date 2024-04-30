import { Component, OnInit } from '@angular/core';
import { UserService } from "../../service/user.service";
import { StoreService } from "../../service/store.service";
import { Router } from "@angular/router";
import { UserValidationUtil } from "../../util/userValidationUtil";
import { take } from "rxjs";

@Component({
  selector: 'app-register',
  template: `
      <div class="flex justify-evenly items-center h-screen bg-fixed-cover-2">
          <div class="p-10">
              <h1 class="font-bold text-5xl my-5 my-10 text-white">Register Now!</h1>
              <form (ngSubmit)="onRegister()">
                  <div>
                      <input
                              type="text"
                              placeholder="e-mail"
                              [(ngModel)]="userName"
                              name="userName"
                              class="custom-input"
                      />
                  </div>
                  <div>
                      <input
                              type="password"
                              placeholder="create password"
                              [(ngModel)]="userPassword"
                              name="userPassword"
                              class="custom-input"
                      />
                  </div>
                  <div>
                      <input
                              type="password"
                              placeholder="confirm password"
                              [(ngModel)]="confirmPassword"
                              name="confirmPassword"
                              class="custom-input"
                      />
                  </div>

                  <div>
                      <button type="submit" [disabled]="isPending" class="custom-button w-2/5">
                          Register
                      </button>
                  </div>
              </form>

              <div>
                  <button class="underline text-white text-lg" type="button" (click)="navigateToLogin()">
                      &lt; Back To Login
                  </button>
              </div>
          </div>

          <div class="flex items-center">
              <app-logo textColor="text-black" imageSize="w-20" textSize="text-5xl"></app-logo>
          </div>
      </div>
  `,
  styles: [],
})
export class RegisterComponent implements OnInit {
  userName: string = '';
  userPassword: string = '';
  confirmPassword: string = '';
  isPending: boolean = false;

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

  onRegister() {
    if (!this.userValidationUtil.validate(this.userName, this.userPassword)) {
      return;
    }
    if (this.userPassword !== this.confirmPassword) {
      console.error('Passwords do not match');
      return;
    }

    this.isPending = true;
    this.userService.register({ userName: this.userName, userPassword: this.userPassword })
      .pipe(take(1))
      .subscribe(
        (response: any) => {
          this.storeService.UserSignIn(response.userId);
          localStorage.setItem('userInfo', JSON.stringify(response.userId));
          this.router.navigate(['app/welcome']);
        },
        (error) => {
          console.error('Registration failed:', error);
        }
      )
      .add(() => this.isPending = false);
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }
}
