import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardplbComponent } from './dashboardplb.component';

describe('DashboardplbComponent', () => {
  let component: DashboardplbComponent;
  let fixture: ComponentFixture<DashboardplbComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardplbComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardplbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
