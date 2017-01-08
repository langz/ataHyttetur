import { Component } from '@angular/core';

import { LoadingController, NavController } from 'ionic-angular';
import { DataProvider } from '../../providers/data';

import { ScheduleDetailsPage } from './schedule-details/schedule-details';

@Component({
  selector: 'schedule-page',
  templateUrl: 'schedule.html'
})
export class SchedulePage {
  public friday = [];
  public saturday = [];
  public sunday = [];
  constructor(private navCtrl: NavController, private data: DataProvider, private loadingController: LoadingController) {

  }

  openNavDetailsPage(event) {
    console.log(event)
    this.navCtrl.push(ScheduleDetailsPage, { event: event });
  }

  ionViewDidLoad() {
    let loader = this.loadingController.create({
      content: 'Loading events...'
    })
    loader.present().then(() => {

      this.data.list('schedule',
        {
          query: {
            orderByChild: 'dateTimeStart'
          }
        }).subscribe(data => {
          this.friday = data.filter(event => event.date === '2017-01-20');
          this.saturday = data.filter(event => event.date === '2017-01-21');
          this.sunday = data.filter(event => event.date === '2017-01-22');
          loader.dismiss();
        });
    })
  }

}
