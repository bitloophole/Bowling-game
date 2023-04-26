import { addRound } from 'src/app/score-state-store/score.actions';
import { Frame } from '../models/frames.model';

const initialState: Frame [] = []

import { createReducer, on } from '@ngrx/store';

export const counterReducer = createReducer(
  initialState,
  on(addRound, (state, entry)  => {
    const score:Frame[] = JSON.parse(JSON.stringify(state))
    score.push(entry.frame)
    return score;
  }),
);




