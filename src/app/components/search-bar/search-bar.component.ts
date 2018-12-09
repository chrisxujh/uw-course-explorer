import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {
  @Output() contentEmitter: EventEmitter<any> = new EventEmitter();
  @Input() placeHolder = 'Search...';

  constructor() {}

  ngOnInit() {}

  handleInput($event) {
    this.contentEmitter.emit($event.target.value);
  }
}
