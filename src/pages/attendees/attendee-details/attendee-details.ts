import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DataProvider } from '../../../providers/data';

@Component({
  selector: 'attendeedetail-page',
  templateUrl: 'attendee-details.html'
})
export class AttendeeDetailsPage {
  attendee;
  roomies = [];
  roomiesExcludingAttendee = [];
  location = 'specific';
  constructor(private navCtrl: NavController, private data: DataProvider, private params: NavParams) {
    this.attendee = params.data.attendee;
    this.roomies = params.data.roomies;
    this.roomiesExcludingAttendee = this.roomies.filter(roomie => this.attendee.etternavn !== roomie.etternavn && this.attendee.fornavn !== roomie.fornavn);
  }

  openNavDetailsPage(attendee) {
    this.navCtrl.push(AttendeeDetailsPage, { attendee: attendee, roomies: this.roomies });
  }

  ngOnInit() { }

}
