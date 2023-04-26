import { createSelector, createFeatureSelector } from '@ngrx/store';
import { Frame } from '../models/frames.model';

export const totalScore = createSelector(
    createFeatureSelector('score'),
    (state:Frame[]) => {
        if(state.length) {
            let totalScore = 0;
            for (let i = 0; i < state.length; i++) {
              const frame = state[i];
          
              if (frame.first === 10) {  // if it's a strike
                totalScore += 10;  // add 10 to the score
                const nextFrame = state[i + 1];
                if (nextFrame) {
                  if (nextFrame.first === 10) {  // if the next frame is also a strike
                    totalScore += 10;  // add 10 to the score
                    const secondNextFrame = state[i + 2];
                    if (secondNextFrame) {
                      totalScore += secondNextFrame.first;  // add the first roll of the next frame after the next frame
                    }
                  } else {  // otherwise
                    totalScore += nextFrame.first + nextFrame.second;  // add the score of the next frame
                  }
                }
                if (i === 9) {  // if it's the 10th frame
                  totalScore += frame.second + frame.third;  // add the score of the second and third rolls
                }
              } else if (frame.first + frame.second === 10) {  // if it's a spare
                totalScore += 10;  // add 10 to the score
                const nextFrame = state[i + 1];
                if (nextFrame) {
                  totalScore += nextFrame.first;  // add the first roll of the next frame
                }
                if (i === 9) {  // if it's the 10th frame
                  totalScore += frame.third;  // add the score of the third roll
                }
              } else {  // otherwise
                totalScore += frame.first + frame.second;  // add the score of the frame
              }
            }
            return totalScore;
        } else {
            return 0;
        }
    }
)

export const roundPlayedByUser = createSelector(
    createFeatureSelector('score'),
    (state:Frame[]) => {return state;}
)


