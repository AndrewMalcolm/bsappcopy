import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlbComponent } from './plb.component';

describe('PlbComponent', () => {
  let component: PlbComponent;
  let fixture: ComponentFixture<PlbComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlbComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
