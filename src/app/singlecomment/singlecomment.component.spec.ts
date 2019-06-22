import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SinglecommentComponent } from './singlecomment.component';

describe('SinglecommentComponent', () => {
  let component: SinglecommentComponent;
  let fixture: ComponentFixture<SinglecommentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SinglecommentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SinglecommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
