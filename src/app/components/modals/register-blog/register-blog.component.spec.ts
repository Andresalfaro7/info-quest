import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterBlogComponent } from './register-blog.component';

describe('RegisterBlogComponent', () => {
  let component: RegisterBlogComponent;
  let fixture: ComponentFixture<RegisterBlogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterBlogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterBlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
