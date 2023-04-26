import { createAction, props } from '@ngrx/store';
import { Frame } from '../models/frames.model'

export const addRound = createAction('[Bowling] Add round', props<{frame: Frame}>());
