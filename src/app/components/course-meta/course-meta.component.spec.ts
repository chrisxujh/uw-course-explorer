import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseMetaComponent } from './course-meta.component';

describe('CourseMetaComponent', () => {
  let component: CourseMetaComponent;
  let fixture: ComponentFixture<CourseMetaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseMetaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseMetaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
