import { Injectable, Renderer2, RendererFactory2, effect, PLATFORM_ID, Inject } from '@angular/core';
import { signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export type ThemeMode = 'light' | 'dark' | 'system';

@Injectable({ providedIn: 'root' })
export class ThemeToggleService {
  private isBrowser: boolean = true;

  themeMode = signal<ThemeMode>('system');
  effectiveTheme = signal<'light' | 'dark'>('light');

  private storageKey = 'kt-theme';
  private systemMediaQuery: any;
  private systemListener: (() => void) | null = null;
  private renderer: Renderer2 | undefined;

  constructor(rendererFactory: RendererFactory2, @Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    if (this.isBrowser) {
      console.log('ThemeToggleService initialized');
      this.systemMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      this.renderer = rendererFactory.createRenderer(null, null);

      // Read theme mode from localStorage
      const stored = localStorage.getItem(this.storageKey) as ThemeMode | null;
      if (stored === 'light' || stored === 'dark' || stored === 'system') {
        this.themeMode.set(stored);
      } else {
        this.themeMode.set('system');
      }
      this.updateEffectiveTheme();
      this.setSidebarThemeMode(this.effectiveTheme());
      // React to themeMode changes
      effect(() => {
        this.updateEffectiveTheme();
        this.applyThemeToHtml();
        this.setupSystemListener();
        this.setSidebarThemeMode(this.effectiveTheme());
      });
    }

  }

  // Compute effective theme
  private updateEffectiveTheme() {
    if (this.isBrowser) {
      if (this.themeMode() === 'system') {
        this.effectiveTheme.set(this.systemMediaQuery.matches ? 'dark' : 'light');
      } else {
        this.effectiveTheme.set(this.themeMode() as 'light' | 'dark');
      }
    }

  }

  // Apply theme to <html>
  private applyThemeToHtml() {
    if (this.isBrowser) {
      const html = document.documentElement;
      html.classList.remove('light', 'dark');
      html.setAttribute('data-theme', this.effectiveTheme());
      html.classList.add(this.effectiveTheme());
    }

  }

  // Listen for system theme changes if in system mode
  private setupSystemListener() {
    if (this.isBrowser) {
      this.removeSystemListener();
      if (this.themeMode() === 'system') {
        const handler = (e: MediaQueryListEvent) => {
          this.updateEffectiveTheme();
          this.applyThemeToHtml();
        };
        this.systemMediaQuery.addEventListener('change', handler);
        this.systemListener = () => this.systemMediaQuery.removeEventListener('change', handler);
      }
    }

  }

  private removeSystemListener() {
    if (this.isBrowser) {
      if (this.systemListener) {
        this.systemListener();
        this.systemListener = null;
      }
    }

  }

  setThemeMode(mode: ThemeMode) {
    if (this.isBrowser) {
      this.themeMode.set(mode);
      localStorage.setItem(this.storageKey, mode);
      this.updateEffectiveTheme();
      this.applyThemeToHtml();
      this.setupSystemListener();
      this.setSidebarThemeMode(mode);
    }

  }
  setSidebarThemeMode(mode: ThemeMode) {
    if (this.isBrowser) {
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
  }
}