import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from '../../../../node_modules/rxjs';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit, OnDestroy {
  birthday: string;
  age$: Observable<any>;
  interval: any;

  constructor() {}

  ngOnInit() {
    this.birthday = new Date(1544158800000).toString();
    this.age$ = Observable.create(observer => {
      this.interval = setInterval(() => {
        const timeDiff =
          Date.parse(new Date().toString()) - Date.parse(this.birthday);
        const diff = new Date(timeDiff);
        observer.next({
          secondsDiff: diff.getUTCSeconds(),
          minutesDiff: diff.getUTCMinutes(),
          hoursDiff: diff.getUTCHours(),
          daysDiff: Math.ceil(timeDiff / (1000 * 3600 * 24))
        });
      });
    });
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }
}
