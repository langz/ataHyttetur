import { Component } from '@angular/core';
import { LoadingController, NavController } from 'ionic-angular';
import { DataProvider } from '../../providers/data';
import { AttendeeDetailsPage } from './attendee-details/attendee-details';

@Component({
  selector: 'attendees-page',
  templateUrl: 'attendees.html'
})
export class AttendeesPage {
  attendees = [];
  attendeeCopy = [];
  loading = true;
  constructor(private navCtrl: NavController, private data: DataProvider, private loadingController: LoadingController) {

  }


  getItems(ev: any) {
    // Reset items back to all of the items
    this.attendees = this.attendeeCopy;

    // set val to the value of the searchbar
    let val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.attendees = this.attendees.filter((item) => {
        return (item.fullname.toLowerCase().indexOf(val.toLowerCase()) > -1)
          || (item.navn.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

  openNavDetailsPage(attendee) {
    this.navCtrl.push(AttendeeDetailsPage, { attendee: attendee });
  }

  ionViewDidLoad() {
    this.loading = true;
    let loader = this.loadingController.create({
      content: 'Loading attendees...'
    })
    loader.present().then(() => {
      this.data.list('attendees',
        {
          query: {
            orderByChild: 'etternavn'
          }
        }).subscribe(data => {
          this.attendeeCopy = data.map(attendee => {
            attendee.fullname = attendee.fornavn + ' ' + attendee.etternavn;
            return attendee;
          });
          this.attendees = this.attendeeCopy;
          loader.dismiss();
          this.loading = false;
        });
    })
  }

}
