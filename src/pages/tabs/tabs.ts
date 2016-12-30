import { Component } from '@angular/core';

import { SchedulePage } from '../schedule/schedule';
import { AttendeesPage } from '../attendees/attendees';
import { ChatPage } from '../chat/chat';
import { AdminPage } from '../admin/admin';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = SchedulePage;
  tab2Root: any = AttendeesPage;
  tab3Root: any = ChatPage;
  tab4Root: any = AdminPage;

  constructor() {

  }
}
