import { Component, HostBinding, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MetronicInitService } from '../../core/services/metronic-init.service';
import { SidebarComponent } from '../../shared/components/system-managerment/sidebar/sidebar.component';
import { HeaderComponent } from '../../shared/components/system-managerment/header/header.component';
import { FooterComponent } from '../../shared/components/system-managerment/footer/footer.component';
import { ThemeToggleComponent } from '../../partials/theme-toggle/theme-toggle.component';
import { ModalsSearchComponent } from '../../partials/modals-search/modals-search.component';

@Component({
  selector: 'app-system-management-layout',
  templateUrl: './system-management-layout.html',
  styleUrl: './system-management-layout.scss',
  imports: [RouterOutlet, ThemeToggleComponent, SidebarComponent, HeaderComponent, FooterComponent, ModalsSearchComponent],
})
export class SystemManagementLayout {

  @HostBinding('class') class = 'flex grow';
  private metronicInitService = inject(MetronicInitService);
  ngAfterViewInit(): void {
    this.metronicInitService.init();
  }
}
