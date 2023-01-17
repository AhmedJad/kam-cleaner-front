import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebDataService {
  private contact: BehaviorSubject<any> = new BehaviorSubject<string>(null);
  $contact = this.contact.asObservable();
  constructor() { }
  setContact(contact) {
    this.contact.next(contact);
  }
}
