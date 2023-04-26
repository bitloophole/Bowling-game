import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { addRound } from '../score-state-store/score.actions';
import { Frame } from '../models/frames.model';
import { calculateTotalScore, roundPlayedByUser } from '../score-state-store/score.selectors';

@Component({
  selector: 'app-bowling-score-calculator',
  templateUrl: './bowling-score-calculator.component.html',
  styleUrls: ['./bowling-score-calculator.component.less']
})
export class BowlingScoreCalculatorComponent {

  frames$: Observable<Frame[]>;
  totalScore$: Observable<number>;

  isEleventhChance: boolean = false;
  frameLength: number = 0;


  isSpareOrStrike: boolean = false; 
  isvalidInput: boolean = false;

  constructor(private store: Store<Frame[]>) {
    this.totalScore$ = store.select(calculateTotalScore);
    this.frames$ = store.select(roundPlayedByUser)
  }

  scoreForm = new FormGroup({
    first: new FormControl(),
    second: new FormControl(),
    third: new FormControl()
  })

  ngOnInit() {
    this.frames$.subscribe((score: Frame[]) => {
      this.frameLength = score.length;
    })
  }

  /** Method trigger when user input in 'first' field and validate the input and game senario*/

  validateInput() {
    let firstRoll: number = parseInt(this.scoreForm.value.first);
    if (firstRoll === 10 && this.frameLength < 9) {
      this.scoreForm.controls.second.disable();
    }
    if (firstRoll === 10 && this.frameLength > 8) {
      this.isEleventhChance = true;
    }
  }

  /** Method get call on submit, 
   * dispach the data to store,
   * validate if total round is completed
   * check for Strike or Spare condition
   * reset the form field */

  calculateScore() {
    if (this.scoreForm.status == 'INVALID' &&  !this.scoreForm.controls['second'].disabled) {
      this.isvalidInput = true;
      return;
    } else {
      this.isvalidInput = false;
    }
    const firstRoll: number = parseInt(this.scoreForm.value.first);
    const secondRoll: number = parseInt(this.scoreForm.value.second) || 0;
    const thirdRoll: number = parseInt(this.scoreForm.value.third) || 0;

    this.store.dispatch(addRound({ frame: { 'first': firstRoll, 'second': secondRoll, third: thirdRoll } }));
    if ((firstRoll === 10 || firstRoll + secondRoll === 10) && this.frameLength !== 10) {
      this.isSpareOrStrike = true;
    } else {
      this.isSpareOrStrike = false;
    }
    this.scoreForm.reset();
    this.scoreForm.controls.second.enable();
  }



//Calculate scores takes Frams<array> and return {'score': totalScore}(for testing purpose)
  calculateBowlingScore(state: any) {
    if (state.length) {
      let totalScore = 0;
      for (let i = 0; i < state.length; i++) {
        const frame = state[i];

        if (frame.first === 10) {  
          totalScore += 10;  
          const nextFrame = state[i + 1];
          if (nextFrame) {
            if (nextFrame.first === 10) {  
              totalScore += 10; 
              const secondNextFrame = state[i + 2];
              if (secondNextFrame) {
                totalScore += secondNextFrame.first;  
              } else if(i==8 && !secondNextFrame) {
              	totalScore += nextFrame.second;
              }
            } else {  
              totalScore += nextFrame.first + nextFrame.second; 
            }
          }
          if (i === 9) {  
            totalScore += frame.second + frame.third;  
          }
        } else if (frame.first + frame.second === 10) {  
          totalScore += 10;  
          const nextFrame = state[i + 1];
          if (nextFrame) {
            totalScore += nextFrame.first;  
          }
          if (i === 9) {  
            totalScore += frame.third;
          }
        } else {  
          totalScore += frame.first + frame.second;  
        }
      }
      return { "score": totalScore };
    } else {
      return {"score":0};
    }
  }

}
