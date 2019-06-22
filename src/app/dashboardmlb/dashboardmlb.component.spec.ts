import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardmlbComponent } from './dashboardmlb.component';

describe('DashboardmlbComponent', () => {
  let component: DashboardmlbComponent;
  let fixture: ComponentFixture<DashboardmlbComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardmlbComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardmlbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
