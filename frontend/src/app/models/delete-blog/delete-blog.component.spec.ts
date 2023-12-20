import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteBlogComponent } from './delete-blog.component';

describe('DeleteBlogComponent', () => {
  let component: DeleteBlogComponent;
  let fixture: ComponentFixture<DeleteBlogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteBlogComponent]
    });
    fixture = TestBed.createComponent(DeleteBlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
