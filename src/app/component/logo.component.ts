import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-logo',
  template: `
      <div>
          <div class="flex justify-start items-center">
              <img [src]="imageSrc" alt="" [class]="imageSize" />
              <span [class]="textColor + ' ' + textSize">twc</span>
          </div>

          <div>
              <p [class]="textColor + ' font-extrabold ' + textSize">contacts</p>
              <p [class]="textColor + ' ' + textSize">portal</p>
          </div>
      </div>
  `,
  styles: []
})
export class LogoComponent {
  @Input() textColor!: string;
  @Input() imageSize!: string;
  @Input() textSize!: string;

  // Adjust the path to your image accordingly
  imageSrc: string = 'assets/Logo.png';
}
