import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  styleUrl: './app.component.scss',
  template:`
      <div class="bg-customBlue">
          <router-outlet/>
      </div>

  `
})
export class AppComponent {
  title = 'twc-test-angular';
}
