import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { LaunchNavigator, LaunchNavigatorOptions } from 'ionic-native';

declare var window: any;

@Component({
  selector: 'scheduledetail-page',
  templateUrl: 'schedule-details.html'
})
export class ScheduleDetailsPage {
  map;
  start: string;
  geoLink;
  event;
  roomies = [];
  location = 'specific';
  weekdays = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']
  constructor(private navCtrl: NavController, private params: NavParams) {
    this.start = "";
    this.event = params.data.event;
    this.geoLink = 'http://maps.google.com/?q=' + this.event.lat + ',' + this.event.lng;
    this.map = {
      lat: this.event.lat,
      lng: this.event.lng,
      zoom: 15,
      markerLabel: this.event.title
    }
  }

  linkGeo() {
    window.open(this.geoLink, '_blank');
  }

  getDirections() {
    let options: LaunchNavigatorOptions = {
      start: this.start
    };
    LaunchNavigator.navigate(this.map.lat + ',' + this.map.lng, options)
      .then(
      success => console.log('Launched navigator'),
      error => console.log('Error launching navigator: ' + error)
      );
  }

  getDay(messageDate) {
    let date = new Date(messageDate);
    let now = new Date();
    let prefix = 'TODAY';
    if (date.toDateString() !== now.toDateString()) {
      prefix = this.weekdays[date.getDay()] + ' ';
    }
    return prefix;
  }

  addZero(i) {
    if (i < 10) {
      i = "0" + i;
    }
    return i;
  };
  ngOnInit() {
    console.log('hi world')
  }

}
