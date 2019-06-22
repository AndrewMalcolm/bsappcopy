import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowserfoolComponent } from './browserfool.component';

describe('BrowserfoolComponent', () => {
  let component: BrowserfoolComponent;
  let fixture: ComponentFixture<BrowserfoolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrowserfoolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrowserfoolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
