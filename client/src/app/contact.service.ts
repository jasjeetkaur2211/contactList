import { Injectable } from '@angular/core';
import {Contact} from './contacts';
import 'rxjs/add/operator/map';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs/Observable";



@Injectable()
export class ContactService {

  url = "http://localhost:3000/api/";
  constructor(private http: HttpClient) { }

  //retrieving contacts service

  getContacts() : Observable<any> {
    return this.http.get(this.url+'contacts');
  }

  //add new contact
  addContact(newContact): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set("Accept", "application/json");
    return this.http.post(this.url+'contact', newContact, {headers: headers});
  }

  //delete contact
  deleteContact(id) : Observable<any>{
    return this.http.delete(this.url+'contact/'+id);
  }
}
