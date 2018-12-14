import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';

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
    this.birthday = new Date(1544164920000).toString();
    let timeDiff =
      Date.parse(new Date().toString()) - Date.parse(this.birthday);
    this.age$ = Observable.create(observer => {
      this.interval = setInterval(() => {
        timeDiff += 1000;
        const diff = new Date(timeDiff);
        observer.next({
          secondsDiff: diff.getUTCSeconds(),
          minutesDiff: diff.getUTCMinutes(),
          hoursDiff: diff.getUTCHours(),
          daysDiff: Math.ceil(timeDiff / (1000 * 3600 * 24))
        });
      }, 1000);
    });
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }
}
