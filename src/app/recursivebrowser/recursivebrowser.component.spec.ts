import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecursivebrowserComponent } from './recursivebrowser.component';

describe('RecursivebrowserComponent', () => {
  let component: RecursivebrowserComponent;
  let fixture: ComponentFixture<RecursivebrowserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecursivebrowserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecursivebrowserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
