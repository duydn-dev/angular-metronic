import { Component } from '@angular/core';
import { MegaMenuComponent } from '../../../../partials/mega-menu/mega-menu.component';
import { TopbarChatComponent } from '../../../../partials/topbar-chat/topbar-chat.component';
import { NotificationDrawerComponent } from '../../../../partials/notification-drawer/notification-drawer.component';
import { TopbarAppsComponent } from '../../../../partials/topbar-apps/topbar-apps.component';
import { TopbarUserDropdownComponent } from '../../../../partials/topbar-user-dropdown/topbar-user-dropdown.component';

@Component({
  selector: '[app-header]',
  templateUrl: './header.component.html',
  imports: [MegaMenuComponent, TopbarChatComponent, NotificationDrawerComponent, TopbarAppsComponent, TopbarUserDropdownComponent],
})
export class HeaderComponent {}
