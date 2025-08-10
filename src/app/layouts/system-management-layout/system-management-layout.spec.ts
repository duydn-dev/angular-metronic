import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemManagementLayout } from './system-management-layout';

describe('SystemManagementLayout', () => {
  let component: SystemManagementLayout;
  let fixture: ComponentFixture<SystemManagementLayout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SystemManagementLayout]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SystemManagementLayout);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
