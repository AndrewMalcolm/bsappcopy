import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExportnavigatorComponent } from './exportnavigator.component';

describe('ExportnavigatorComponent', () => {
  let component: ExportnavigatorComponent;
  let fixture: ComponentFixture<ExportnavigatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExportnavigatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExportnavigatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
