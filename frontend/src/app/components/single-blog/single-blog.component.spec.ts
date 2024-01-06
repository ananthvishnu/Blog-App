import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleBlogComponent } from './single-blog.component';

describe('SingleBlogComponent', () => {
  let component: SingleBlogComponent;
  let fixture: ComponentFixture<SingleBlogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SingleBlogComponent]
    });
    fixture = TestBed.createComponent(SingleBlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
