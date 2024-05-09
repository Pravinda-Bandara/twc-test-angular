import { Injectable } from '@angular/core';
import {HttpErrorResponse} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ErrorUtilService {
  public errorMessage(error: HttpErrorResponse): string {
    let errorMessage = 'Error';
    if (error.error && error.error.message) {
      errorMessage = error.error.message;
    }
    return errorMessage;
  }
}
