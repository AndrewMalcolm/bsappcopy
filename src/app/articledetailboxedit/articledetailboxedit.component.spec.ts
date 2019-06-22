import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticledetailboxeditComponent } from './articledetailboxedit.component';

describe('ArticledetailboxeditComponent', () => {
  let component: ArticledetailboxeditComponent;
  let fixture: ComponentFixture<ArticledetailboxeditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticledetailboxeditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticledetailboxeditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
