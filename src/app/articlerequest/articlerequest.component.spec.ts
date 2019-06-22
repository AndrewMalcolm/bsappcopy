import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticlerequestComponent } from './articlerequest.component';

describe('ArticlerequestComponent', () => {
  let component: ArticlerequestComponent;
  let fixture: ComponentFixture<ArticlerequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticlerequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticlerequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
