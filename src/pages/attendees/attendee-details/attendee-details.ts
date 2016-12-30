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
  location = 'specific';
  constructor(private navCtrl: NavController, private data: DataProvider, private params: NavParams) {
    this.attendee = params.data.attendee;
  }

  openNavDetailsPage(attendee) {
    this.navCtrl.push(AttendeeDetailsPage, { attendee: attendee });
  }

  ngOnInit() {
    console.log('hei schedule');
    this.data.list('attendees',
      {
        query: {
          orderByChild: 'romnavn',
          equalTo: this.attendee.romnavn
        }
      }).subscribe(data => {
        this.roomies = data.filter(roomie => roomie.$key !== this.attendee.$key);
      });
  }

}
