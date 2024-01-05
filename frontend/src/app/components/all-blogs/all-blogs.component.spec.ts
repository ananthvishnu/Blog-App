import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllBlogsComponent } from './all-blogs.component';

describe('AllBlogsComponent', () => {
  let component: AllBlogsComponent;
  let fixture: ComponentFixture<AllBlogsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AllBlogsComponent]
    });
    fixture = TestBed.createComponent(AllBlogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
