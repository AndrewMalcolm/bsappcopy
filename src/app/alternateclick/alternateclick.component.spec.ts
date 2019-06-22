import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlternateclickComponent } from './alternateclick.component';

describe('AlternateclickComponent', () => {
  let component: AlternateclickComponent;
  let fixture: ComponentFixture<AlternateclickComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlternateclickComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlternateclickComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
