import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardbrowserComponent } from './dashboardbrowser.component';

describe('DashboardbrowserComponent', () => {
  let component: DashboardbrowserComponent;
  let fixture: ComponentFixture<DashboardbrowserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardbrowserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardbrowserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
