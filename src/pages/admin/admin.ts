import { Component } from '@angular/core';
import { NavController, ToastController, ModalController } from 'ionic-angular';
import { DataProvider } from '../../providers/data';
import { Storage } from '@ionic/storage';
import { Login } from './login/login';

@Component({
  selector: 'admin-page',
  templateUrl: 'admin.html'
})
export class AdminPage {
  map;
  isAdmin = false;
  tried = false;
  public event = {
    title: '',
    description: '',
    date: '2017-01-20',
    dateTimeStart: '',
    timeStarts: '',
    timeEnds: '',
    lat: 0,
    lng: 0
  }
  constructor(private navCtrl: NavController,
    private data: DataProvider,
    private toastCtrl: ToastController,
    private modalCtrl: ModalController,
    private localStorage: Storage) {

    this.map = {
      lat: 61.307594,
      lng: 12.238861,
      zoom: 13
    }

  }

  mapClicked($event: MouseEvent) {
    this.event.lat = $event['coords'].lat;
    this.event.lng = $event['coords'].lng;
  }

  showToast(message: string) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 2000,
    });

    toast.present(toast);
  }

  addEvent(event) {
    if (this.filledAllFields(event)) {
      event.dateTimeStart = event.date + 'T' + event.timeStarts + '+01:00';
      this.data.push('schedule', event).subscribe(data => {
        this.showToast('Added event "' + event.title + '"');
        this.event = {
          title: '',
          description: '',
          date: '2017-01-20',
          dateTimeStart: '',
          timeStarts: '',
          timeEnds: '',
          lat: 0,
          lng: 0
        }
      });
    }
    else {
      this.showToast('All fields and location, except End Time is required');
    }
  }
  filledAllFields(event) {
    return event.title && event.description && event.date && event.timeStarts && event.lat && event.lng;
  }

  openModal() {
    let modal = this.modalCtrl.create(Login);
    modal.onDidDismiss(data => {
      this.tried = true;
      if (data) {
        this.isAdmin = data;
        this.localStorage.set('admin', data);
      }
    });
    modal.present();
  }

  ionViewWillEnter() {
    this.event = {
      title: '',
      description: '',
      date: '2017-01-20',
      dateTimeStart: '',
      timeStarts: '',
      timeEnds: '',
      lat: 0,
      lng: 0
    }
    this.tried = false;
    this.localStorage.get('admin').then((val) => {
      this.isAdmin = val;
      if (!this.isAdmin) {
        this.openModal();
      }
    });
  }

}
