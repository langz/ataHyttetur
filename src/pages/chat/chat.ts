import { Component, ViewChild, Inject } from '@angular/core';
import { LoadingController, NavController, Content, ActionSheetController, ModalController, ToastController } from 'ionic-angular';
import { DataProvider } from '../../providers/data';
import { Camera, CameraOptions, PhotoViewer } from 'ionic-native';
import { ChatName } from './chat-name/chat-name';
import { Storage } from '@ionic/storage';
import { FirebaseApp } from 'angularfire2';


@Component({
  selector: 'chat-page',
  templateUrl: 'chat.html'
})
export class ChatPage {

  @ViewChild(Content) content: Content;
  inputActive = false;
  activeToast = false;
  isAtBottom = false;
  toast;
  imgSrc: any;
  storage: any;
  username: '';
  pageActive = false;
  toastDismissByScroll = false;
  public message = {
    name: '',
    dateTimeStart: '',
    text: '',
    image: ''
  }
  public messages = [];

  weekdays = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

  constructor(private navCtrl: NavController,
    private data: DataProvider,
    private loadingController: LoadingController,
    @Inject(FirebaseApp) firebaseApp: any,
    private actionSheetCtrl: ActionSheetController,
    private modalCtrl: ModalController,
    private localStorage: Storage,
    private toastCtrl: ToastController) {

    this.storage = firebaseApp.storage().ref();
    this.localStorage.get('username').then((val) => {
      this.username = val;
    });
  }

  openModal() {
    let modal = this.modalCtrl.create(ChatName);
    modal.onDidDismiss(data => {
      if (data) {
        this.username = data;
        this.localStorage.set('username', data);
      }
    });
    modal.present();
  }

  addTextMessage() {
    this.setMessageTime();
    this.addMessage();
  }

  setMessageTime() {
    let date = new Date();

    this.message.dateTimeStart = date.toISOString();
  }

  getTimeFormat(messageDate) {
    let date = new Date(messageDate);
    let now = new Date();
    let prefix = '';
    if (date.toDateString() !== now.toDateString()) {
      prefix = this.weekdays[date.getDay()] + ' ';
    }
    let h = this.addZero(date.getHours());
    let m = this.addZero(date.getMinutes());
    return prefix + h + ":" + m;
  }

  addMessage() {
    this.message.name = this.username;
    this.data.push('chat', this.message).subscribe(data => {
      this.message = {
        name: '',
        dateTimeStart: '',
        text: '',
        image: ''
      };
      this.scrollToBottom(200);
    });
  }

  showImage(url) {
    PhotoViewer.show(url);
  }

  addZero(i) {
    if (i < 10) {
      i = "0" + i;
    }
    return i;
  };

  scrollToBottom(duration) {
    setTimeout(() => {
      if (this.pageActive) {
        this.content.scrollToBottom(500);
      }
    }, duration);
  };

  takePicture() {
    let options: CameraOptions = {
      destinationType: Camera.DestinationType.DATA_URL,
      sourceType: Camera.PictureSourceType.CAMERA,
      allowEdit: true,
      encodingType: Camera.EncodingType.JPEG,
      saveToPhotoAlbum: false
    };

    this.addImage(options);
  };

  selectPicture() {
    let options: CameraOptions = {
      destinationType: Camera.DestinationType.DATA_URL,
      sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
      allowEdit: true,
      encodingType: Camera.EncodingType.JPEG,
      saveToPhotoAlbum: false
    };
    this.addImage(options);
  };

  addImage(options: CameraOptions) {
    let loader = this.loadingController.create({
      content: 'Sharing your image with the world :)'
    });
    Camera.getPicture(options).then((imageUri) => {
      loader.present().then(() => {
        this.setMessageTime();
        this.uploadImage(this.message.dateTimeStart, imageUri).then((imageUrl: string) => {
          this.message.image = imageUrl;
          this.addMessage();
          loader.dismiss();
          this.toastDismissByScroll = true;
          this.toast.dismiss();
          this.scrollToBottom(1000);
        });
      });
    });
  }

  uploadImage(name, data) {
    let promise = new Promise((res, rej) => {
      let fileName = name + ".jpeg";
      let uploadTask = this.storage.child(`/images/${fileName}`).putString(data, 'base64', { contentType: 'image/jpeg' });
      uploadTask.on('state_changed', function (snapshot) {
      }, function (error) {
        rej(error);
      }, function () {
        var downloadURL = uploadTask.snapshot.downloadURL;
        res(downloadURL);
      });
    });
    return promise;
  };


  presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Add image',
      buttons: [
        {
          text: 'Take Photo',
          handler: () => {
            this.takePicture();
          }
        }, {
          text: 'Choose From Library',
          handler: () => {
            this.selectPicture();
          }
        }
      ]
    });

    actionSheet.present();
  }
  showToast(message: string) {
    if (!this.activeToast) {
      this.toastDismissByScroll = false;
      this.toast = this.toastCtrl.create({
        showCloseButton: true,
        closeButtonText: message,
        cssClass: 'custom-toast'
      });

      this.toast.onDidDismiss(() => {
        if (this.pageActive && !this.toastDismissByScroll) {
          this.scrollToBottom(200);
        }
        this.activeToast = false;
      });
      this.toast.present(this.toast);
      this.activeToast = true;
    }
  }

  ionViewWillEnter() {
    this.pageActive = true;
    this.content.ionScroll.subscribe((data) => {
      this.isAtBottom = data.scrollTop + data.contentHeight > this.content.getContentDimensions().scrollHeight - 10;
      if (this.isAtBottom && this.toast) {
        this.toastDismissByScroll = true;
        this.toast.dismiss();
      }
    });
  }

  ionViewDidLoad() {
    let loader = this.loadingController.create({
      content: 'Loading messages...'
    });
    loader.present().then(() => {
      this.data.list('chat',
        {
          query: {
            orderByChild: 'dateTimeStart'
          }
        }).subscribe(data => {
          if (this.messages.length === 0) {
            this.messages = data;
          }
          else {
            let lastMessage = data[data.length - 1];
            for (let i = this.messages.length; i < data.length; i++) {
              this.messages.push(data[i]);
            }
            if (lastMessage.name !== this.username && this.pageActive && !this.inputActive) {
              this.showToast('New message(s)');
            }
          }
          loader.dismiss(true);
        });
    })
  }


  ionViewWillLeave() {
    this.pageActive = false;
    if (this.toast) {
      this.toast.dismiss();
    }
  }

}
