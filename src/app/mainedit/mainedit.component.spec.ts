import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaineditComponent } from './mainedit.component';

describe('MaineditComponent', () => {
  let component: MaineditComponent;
  let fixture: ComponentFixture<MaineditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaineditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaineditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
