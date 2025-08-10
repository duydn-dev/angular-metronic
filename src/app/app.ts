import { Component, DOCUMENT, inject, Renderer2, signal } from '@angular/core';
import { Router, NavigationEnd, RouterOutlet } from '@angular/router';
import { MetronicInitService } from './core/services/metronic-init.service';
import { filter } from 'rxjs';

@Component({
  selector: 'body[app-root]',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('metronic-angular');

  private router = inject(Router);
  private document = inject(DOCUMENT);
  private renderer = inject(Renderer2);
  private metronicInitService = inject(MetronicInitService);

  private demoClassMap: Record<string, string> = {
    demo1: 'demo1 kt-sidebar-fixed kt-header-fixed'
  };
  private currentDemo = signal('demo1');

  constructor() {
    this.router.events.pipe(filter(e => e instanceof NavigationEnd)).subscribe(() => {
      this.updateDemo();
      this.metronicInitService.init();
    });
    this.updateDemo();
  }

  private updateDemo() {
    const url = this.router.url;
    const firstSegment = url.split('/').filter(Boolean)[0] || 'demo1';
    const newDemo = firstSegment in this.demoClassMap ? firstSegment : 'demo1';
    this.currentDemo.set(newDemo);
    this.clearDemoClasses();
    this.applyDemoClass(this.demoClassMap[newDemo]);
  }

  private clearDemoClasses() {
    // Remove all possible demo classes from body
    Object.values(this.demoClassMap).forEach(classString => {
      const classes = classString.split(' ');
      classes.forEach(className => {
        if (className.trim()) {
          this.renderer.removeClass(this.document.body, className.trim());
        }
      });
    });
  }

  private applyDemoClass(classString: string) {
    const classes = classString.split(' ');
    classes.forEach(className => {
      if (className.trim()) {
        this.renderer.addClass(this.document.body, className.trim());
      }
    });
  }
}
