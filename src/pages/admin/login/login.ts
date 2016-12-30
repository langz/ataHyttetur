import { Component } from '@angular/core';
import { AlertController, Platform, NavParams, ViewController } from 'ionic-angular';

@Component({
  templateUrl: 'login.html'
})
export class Login {
  username = '';
  password = '';
  constructor(private platform: Platform,
    private params: NavParams,
    private viewCtrl: ViewController,
    private alertCtrl: AlertController) {

  }
  dismiss() {
    this.viewCtrl.dismiss(false);
  }
  login() {
    if (this.username ==='admin' && this.password === 'laaven2017') {
      this.viewCtrl.dismiss(true);
    }
    else {
      this.showAlert();
    }
  }
  showAlert() {
    let alert = this.alertCtrl.create({
      title: 'Incorrect username or password',
      subTitle: 'Please contact Anders Langseth if you need admin rights',
      buttons: ['OK']
    });
    alert.present();
  }
}
