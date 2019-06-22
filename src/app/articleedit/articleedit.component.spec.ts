import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleeditComponent } from './articleedit.component';

describe('ArticleeditComponent', () => {
  let component: ArticleeditComponent;
  let fixture: ComponentFixture<ArticleeditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticleeditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleeditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
