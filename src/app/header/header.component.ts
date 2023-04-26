import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Frame } from '../models/frames.model';
import { Observable } from 'rxjs';
import { calculateTotalScore } from '../score-state-store/score.selectors';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})
export class HeaderComponent {

  constructor(private store: Store<Frame[]>) {
    this.totalScore$ = store.select(calculateTotalScore);
  }

  totalScore$: Observable<number>;

}
