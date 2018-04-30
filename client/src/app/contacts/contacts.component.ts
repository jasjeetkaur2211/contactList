import { Component, OnInit } from '@angular/core';
import {ContactService} from "../contact.service";
import {Contact} from "../contacts";

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css'],
  providers: [ContactService]
})
export class ContactsComponent implements OnInit {
  contacts: Contact[];
  contact: Contact;
  firstName: string;
  lastName: string;
  phone: string;

  constructor(private contactService: ContactService) { }

  ngOnInit() {
    this.contactService.getContacts().subscribe(contacts =>{
      console.log(contacts);
      this.contacts = contacts
    });
  }

  deleteContact(id: any){
    let contacts = this.contacts;
    this.contactService.deleteContact(id).subscribe(data => {
      // if delete operation was successful
      if(data.n == 1){
        for(let i=0; i<contacts.length; i++){
          if(contacts[i]._id == id)
            contacts.splice(i,1);
        }
      }
    });
  }

  addContact(){
    const newContact = {
      firstName : this.firstName,
      lastName: this.lastName,
      phone: this.phone
    }
    let self = this;
    this.contactService.addContact(newContact).subscribe(contact => {
      self.contacts.push(newContact);
      this.contactService.getContacts().subscribe(contacts =>{
        this.contacts = contacts
      });
    });
  }

}
