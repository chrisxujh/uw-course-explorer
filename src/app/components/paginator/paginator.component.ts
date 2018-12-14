import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css']
})
export class PaginatorComponent implements OnInit {
  @Output() emitter: EventEmitter<any> = new EventEmitter();
  maxIndex: number;
  indexes: number[] = [];
  indexTolerance = 2;
  currentIndex = 1;

  constructor() {}

  ngOnInit() {
    this.resetIndexes();
  }

  @Input()
  set size(s: number) {
    this.maxIndex = s;
    this.currentIndex = 1;
    this.resetIndexes();
  }

  next() {
    if (this.currentIndex < this.maxIndex) {
      this.switchIndex(++this.currentIndex);
    }
  }

  previous() {
    if (this.currentIndex > 1) {
      this.switchIndex(--this.currentIndex);
    }
  }

  switchIndex(index: number) {
    if (index > 0 && index <= this.maxIndex) {
      this.currentIndex = index;
      this.emitIndex(this.currentIndex);
    }
    if (this.currentIndex !== 1) {
      this.resetIndexes();
    }
  }

  private resetIndexes() {
    if (
      this.indexes.length <= 0 ||
      this.currentIndex <= this.indexes[0] ||
      this.currentIndex >= this.indexes[this.indexes.length - 1]
    ) {
      this.indexes = Array.from(Array(this.maxIndex).keys())
        .map(key => key + 1)
        .filter(key =>
          this.currentIndex >= this.indexTolerance
            ? Math.abs(this.currentIndex - key) <= this.indexTolerance
            : key <= 2 * this.indexTolerance + 1
        );
    }
  }

  private emitIndex(index: number) {
    this.emitter.emit(index - 1);
  }
}
