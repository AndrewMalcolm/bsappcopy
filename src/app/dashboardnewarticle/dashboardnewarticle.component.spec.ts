import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardnewarticleComponent } from './dashboardnewarticle.component';

describe('DashboardnewarticleComponent', () => {
  let component: DashboardnewarticleComponent;
  let fixture: ComponentFixture<DashboardnewarticleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardnewarticleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardnewarticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
