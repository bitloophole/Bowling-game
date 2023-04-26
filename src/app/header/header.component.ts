import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Frame } from '../models/frames.model';
import { Observable } from 'rxjs';
import { totalScore } from '../score-state-store/score.selectors';
import { counterReducer } from '../score-state-store/score.reducer';
import { provideMockStore } from '@ngrx/store/testing';
import { StoreModule } from '@ngrx/store';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})
export class HeaderComponent {

  constructor(private store: Store<Frame[]>) {
    this.totalScore$ = store.select(totalScore);
  }

  totalScore$: Observable<number>;

}
