import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticlesingleviewComponent } from './articlesingleview.component';

describe('ArticlesingleviewComponent', () => {
  let component: ArticlesingleviewComponent;
  let fixture: ComponentFixture<ArticlesingleviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticlesingleviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticlesingleviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
