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
          this.friday = data.filter(event => event.date === '2018-01-12');
          this.saturday = data.filter(event => event.date === '2018-01-13');
          this.sunday = data.filter(event => event.date === '2018-01-14');
          loader.dismiss();
        });
    })
  }

}
