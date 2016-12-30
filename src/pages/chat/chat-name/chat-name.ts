import { Component } from '@angular/core';
import { AlertController, Platform, NavParams, ViewController } from 'ionic-angular';

@Component({
  templateUrl: 'chat-name.html'
})
export class ChatName {
  username = '';
  constructor(private platform: Platform,
    private params: NavParams,
    private viewCtrl: ViewController,
    private alertCtrl: AlertController) {

  }
  dismiss() {
    this.viewCtrl.dismiss(false);
  }
  register() {
    if (this.username && !this.username.match(/^\s*$/)) {
      this.viewCtrl.dismiss(this.username);
    }
    else {
      this.showAlert();
    }
  }
  showAlert() {
    let alert = this.alertCtrl.create({
      title: 'Bad name',
      subTitle: 'Please register with a non-empty username',
      buttons: ['OK']
    });
    alert.present();
  }
}
