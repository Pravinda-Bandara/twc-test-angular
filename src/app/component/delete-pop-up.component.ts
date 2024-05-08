import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-delete-popup',
  template: `
      <div class="fixed top-0 left-0 w-full h-full flex items-center justify-center backdrop-blur-sm bg-black bg-opacity-50 z-50" [ngClass]="{'block': isVisible, 'hidden': !isVisible}">
          <div class="bg-white px-9 pb-2 pt-5 rounded-2xl shadow-md">
              <p class="text-lg mb-4">{{ message }}</p>
              <div class="flex justify-center">
                  <button class="custom-button p-1 mb-3 mt-4 mr-2 border-customBlue" (click)="handleConfirm()">Yes</button>
                  <button class="custom-button-white p-1 mb-3 mt-4" (click)="handleCancel()">Cancel</button>
              </div>
          </div>
      </div>
  `,
  styles: `
    .hidden {
      display: none;
    }
  `
})
export class DeletePopUpComponent {
  @Input() message: string = '';
  @Output() onConfirm = new EventEmitter<void>();
  @Output() onCancel = new EventEmitter<void>();

  isVisible: boolean = true;

  handleConfirm(): void {
    this.isVisible = false;
    this.onConfirm.emit();
  }

  handleCancel(): void {
    this.isVisible = false;
    this.onCancel.emit();
  }
}
