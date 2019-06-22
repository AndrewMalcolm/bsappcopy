import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticledetailboxComponent } from './articledetailbox.component';

describe('ArticledetailboxComponent', () => {
  let component: ArticledetailboxComponent;
  let fixture: ComponentFixture<ArticledetailboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticledetailboxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticledetailboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
