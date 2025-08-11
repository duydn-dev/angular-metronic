import { Component, inject } from '@angular/core';
import { ThemeToggleService } from '../theme-toggle/theme-toggle.service';

@Component({
  selector: 'div[app-topbar-user-dropdown]',
  imports: [],
  templateUrl: './topbar-user-dropdown.component.html',
  styleUrl: './topbar-user-dropdown.component.scss'
})
export class TopbarUserDropdownComponent {
  themeService = inject(ThemeToggleService);
  effectiveTheme = this.themeService.effectiveTheme;
  setThemeMode = this.themeService.setThemeMode.bind(this.themeService);

  setSidebarThemeMode(mode: string) {
    const lightSidebar = document.querySelector('.light-sidebar');
      const darkSidebar = document.querySelector('.dark-sidebar');
      if ((mode === 'light') || mode === 'system') {
        lightSidebar?.classList.remove('hidden');
        darkSidebar?.classList.add('hidden');
      }
      else {
        lightSidebar?.classList.add('hidden');
        darkSidebar?.classList.remove('hidden');
      }
  }
  onThemeToggle(event: Event): void {
    const input = event.target as HTMLInputElement | null;
    if (input && typeof input.checked === 'boolean') {
      const mode = input.checked ? 'dark' : 'light';
      this.setThemeMode(mode);
      this.setSidebarThemeMode(mode);
    }
    // If input is null or checked is not boolean, do nothing (fail gracefully)
  }
}
