import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardnotificationComponent } from './dashboardnotification.component';

describe('DashboardnotificationComponent', () => {
  let component: DashboardnotificationComponent;
  let fixture: ComponentFixture<DashboardnotificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardnotificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardnotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
