import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticlesinglerequestComponent } from './articlesinglerequest.component';

describe('ArticlesinglerequestComponent', () => {
  let component: ArticlesinglerequestComponent;
  let fixture: ComponentFixture<ArticlesinglerequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticlesinglerequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticlesinglerequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
