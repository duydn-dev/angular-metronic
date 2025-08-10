import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

// Declare tất cả biến Metronic
declare var KTToggle: any;
declare var KTDrawer: any;
declare var KTMenu: any;
declare var KTScrollable: any;
declare var KTSticky: any;
declare var KTReparent: any;
declare var KTRotate: any;
declare var KTDropdown: any;
declare var KTModal: any;
declare var KTCollapse: any;
declare var KTDismiss: any;
declare var KTTabs: any;
declare var KTAccordion: any;
declare var KTScrollspy: any;
declare var KTScrollto: any;
declare var KTTooltip: any;
declare var KTStepper: any;
declare var KTThemeSwitch: any;
declare var KTImageInput: any;
declare var KTTogglePassword: any;
declare var KTDataTable: any;
declare var KTDatepicker: any;
declare var KTSelect: any;
declare var KTToast: any;

@Injectable({
  providedIn: 'root'
})
export class MetronicInitService {
  private platformId = inject(PLATFORM_ID);

  constructor() {}

  init() {
    // Chỉ chạy khi ở Browser
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    this.safeInit(KTToggle);
    this.safeInit(KTScrollable);
    this.safeInit(KTDrawer);
    this.safeInit(KTMenu);
    this.safeInit(KTSticky);
    this.safeInit(KTReparent);
    this.safeInit(KTRotate);
    this.safeInit(KTDropdown);
    this.safeInit(KTModal);
    this.safeInit(KTCollapse);
    this.safeInit(KTDismiss);
    this.safeInit(KTTabs);
    this.safeInit(KTAccordion);
    this.safeInit(KTScrollspy);
    this.safeInit(KTScrollto);
    this.safeInit(KTTooltip);
    this.safeInit(KTStepper);
    this.safeInit(KTThemeSwitch);
    this.safeInit(KTImageInput);
    this.safeInit(KTTogglePassword);
    this.safeInit(KTDataTable);
    this.safeInit(KTDatepicker);
    this.safeInit(KTSelect);
    this.safeInit(KTToast);
  }

  private safeInit(obj: any) {
    if (typeof obj !== 'undefined' && typeof obj.init === 'function') {
      obj.init();
    }
  }
}
