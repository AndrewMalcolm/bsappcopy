import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentinputComponent } from './commentinput.component';

describe('CommentinputComponent', () => {
  let component: CommentinputComponent;
  let fixture: ComponentFixture<CommentinputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommentinputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentinputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
