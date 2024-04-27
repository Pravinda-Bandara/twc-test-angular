import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { LoginComponent } from './view/login/login.component';
import { RegisterComponent } from './view/register/register.component';
import { AddContactComponent } from './view/add-contact/add-contact.component';
import { ContactListComponent } from './view/contact-list/contact-list.component';
import { WelcomeComponent } from './view/welcome/welcome.component';
import {RouterModule, Routes} from "@angular/router";
import {FormsModule} from "@angular/forms";
import { MainComponent } from './view/main/main.component';
import {authGuard} from "./guard/auth.guard";


const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/app/contacts',
    pathMatch: 'full'
  },
  {
    path: 'contacts',
    component:ContactListComponent
  },
  {
    path: 'welcome',
    component:WelcomeComponent
  },
  {
    path: 'addcontact',
    component:AddContactComponent
  }
]

const routes: Routes = [
  {
    path: '',
    redirectTo: '/app',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'app',
    component: MainComponent,
    children: appRoutes,
    canActivate: [authGuard]

  },

];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    AddContactComponent,
    ContactListComponent,
    WelcomeComponent,
    MainComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
