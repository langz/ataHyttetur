import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { AgmCoreModule } from 'angular2-google-maps/core';
import { MyApp } from './app.component';
import { SchedulePage } from '../pages/schedule/schedule';
import { ScheduleDetailsPage } from '../pages/schedule/schedule-details/schedule-details';
import { AttendeesPage } from '../pages/attendees/attendees';
import { AttendeeDetailsPage } from '../pages/attendees/attendee-details/attendee-details';
import { ChatPage } from '../pages/chat/chat';
import { ChatName } from '../pages/chat/chat-name/chat-name';
import { AdminPage } from '../pages/admin/admin';
import { Login } from '../pages/admin/login/login';
import { TabsPage } from '../pages/tabs/tabs';

import { AngularFireModule } from 'angularfire2';

import { DataProvider } from '../providers/data';

import { IonicImageViewerModule } from 'ionic-img-viewer';

import { Storage } from '@ionic/storage';

export const firebaseConfig = {
  apiKey: "AIzaSyAAr7MsEnhv2fv68UbbO9ugwCQZJTyysNI",
  authDomain: "atahyttetur.firebaseapp.com",
  databaseURL: "https://atahyttetur.firebaseio.com",
  storageBucket: "atahyttetur.appspot.com",
  messagingSenderId: "463725180071"
};

@NgModule({
  declarations: [
    MyApp,
    SchedulePage,
    ScheduleDetailsPage,
    AttendeesPage,
    AttendeeDetailsPage,
    ChatPage,
    ChatName,
    AdminPage,
    TabsPage,
    Login
  ],
  imports: [
    AngularFireModule.initializeApp(firebaseConfig),
    IonicModule.forRoot(MyApp),
    IonicImageViewerModule,
    AgmCoreModule.forRoot({ apiKey: 'AIzaSyAcuvcffY2fNIBMkHrDQFGs9tIn7KJm0lc' })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    SchedulePage,
    ScheduleDetailsPage,
    AttendeesPage,
    AttendeeDetailsPage,
    ChatPage,
    ChatName,
    AdminPage,
    Login,
    TabsPage
  ],
  providers: [DataProvider, Storage, { provide: ErrorHandler, useClass: IonicErrorHandler }]
})
export class AppModule { }
