import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {ContactRequest, ContactResponse} from "../types/contact-types";
import mongoose from "mongoose";

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private baseUrl = 'http://localhost:5050/api/v1/contacts/';

  constructor(private http: HttpClient) { }

  getContactList(contactId: string | null): Observable<ContactResponse[]> {
    return this.http.get<ContactResponse[]>(`${this.baseUrl}${contactId}`);
  }

  deleteContact(userId: mongoose.Types.ObjectId | string | undefined): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.baseUrl}${userId}`);
  }

  signup(user: ContactRequest): Observable<ContactResponse> {
    return this.http.post<ContactResponse>(`${this.baseUrl}`, user);
  }

  updateContact(contact: ContactResponse): Observable<ContactResponse> {
    return this.http.patch<ContactResponse>(`${this.baseUrl}${contact._id}`, contact);
  }
}

