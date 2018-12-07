import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-course-meta',
  templateUrl: './course-meta.component.html',
  styleUrls: ['./course-meta.component.css']
})
export class CourseMetaComponent implements OnInit {
  COURSE_SCHEDULE_META = 'courseSchedule';
  EXAM_SCHEDULE_META = 'examSchedule';

  @Input() course: any;
  currentMeta: string;

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.currentMeta = this.activatedRoute.snapshot.queryParams.meta
      ? this.activatedRoute.snapshot.queryParams.meta
      : this.COURSE_SCHEDULE_META;
  }

  handleCourseSchedule() {
    this.currentMeta = this.COURSE_SCHEDULE_META;
  }

  handleExamSchedule() {
    this.currentMeta = this.EXAM_SCHEDULE_META;
  }
}
