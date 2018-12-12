import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css']
})
export class PaginatorComponent implements OnInit {
  @Output() emitter: EventEmitter<any> = new EventEmitter();
  maxIndex: number;
  indexes: number[];
  currentIndex = 1;

  constructor() {}

  ngOnInit() {
    this.indexes = Array.from(Array(this.maxIndex).keys()).map(key => key + 1);
  }

  @Input()
  set size(s: number) {
    this.maxIndex = s;
  }
  next() {
    if (this.currentIndex < this.maxIndex) {
      this.emitIndex(++this.currentIndex);
    }
  }

  previous() {
    if (this.currentIndex > 1) {
      this.emitIndex(--this.currentIndex);
    }
  }

  switchIndex(index: number) {
    if (index > 0 && index <= this.maxIndex) {
      this.currentIndex = index;
      this.emitIndex(this.currentIndex);
    }
  }

  private emitIndex(index: number) {
    this.emitter.emit(index - 1);
  }
}
