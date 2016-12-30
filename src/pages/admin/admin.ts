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
  isAdmin = false;
  tried = false;
  public event = {
    title: '',
    description: '',
    date: '2017-01-20',
    dateTimeStart: '',
    timeStarts: '',
    timeEnds: ''
  }
  constructor(private navCtrl: NavController,
    private data: DataProvider,
    private toastCtrl: ToastController,
    private modalCtrl: ModalController,
    private localStorage: Storage) {

  }

  showToast(message: string) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 2000,
    });

    toast.present(toast);
  }

  addEvent(event) {
    event.dateTimeStart = event.date + 'T' + event.timeStarts + '+01:00';
    this.data.push('schedule', event).subscribe(data => {
      this.showToast('Added event "' + event.title + '"');
      this.event = {
        title: '',
        description: '',
        date: '2017-01-20',
        dateTimeStart: '',
        timeStarts: '',
        timeEnds: ''
      }
    });
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
    this.tried = false;
    this.localStorage.get('admin').then((val) => {
      this.isAdmin = val;
      if (!this.isAdmin) {
        this.openModal();
      }
    });
  }

}
