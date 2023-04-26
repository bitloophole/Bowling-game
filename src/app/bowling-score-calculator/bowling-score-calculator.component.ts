import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { addRound } from '../score-state-store/score.actions';
import { Frame } from '../models/frames.model';
import { totalScore, roundPlayedByUser } from '../score-state-store/score.selectors';

@Component({
  selector: 'app-bowling-score-calculator',
  templateUrl: './bowling-score-calculator.component.html',
  styleUrls: ['./bowling-score-calculator.component.less']
})
export class BowlingScoreCalculatorComponent {
  
  frames$:Observable<Frame[]>;
  totalScore$: Observable<number>;

  isEleventhChance: boolean = false;
  frameLength:number = 0;


  isSpareorStrike: boolean = false;
  frames: Array<{}> = [];

  isvalidInput:boolean= false;

  constructor(private store: Store<Frame[]>) {
    this.totalScore$ = store.select(totalScore);
    this.frames$ = store.select(roundPlayedByUser)
  }  

  scoreForm = new FormGroup({
    first: new FormControl(),
    second: new FormControl(),
    third: new FormControl()
  })

  ngOnInit() {
    this.frames$.subscribe( (score:Frame[]) => {
      this.frameLength = score.length;
      this.frames = score;
    })
  }

  validateInput() {
    let firstRoll:number = this.scoreForm.value.first;
    if(firstRoll === 10 && this.frameLength <  7) {
      this.scoreForm.controls.second.disable();
    } 
    if(firstRoll === 10 && this.frameLength >  7) {
      this.isEleventhChance = true;
    } 
  }

  /** Method get call on submit, 
   * dispach the data to store,
   * validate if total round is completed
   * check for Strike or Spare condition
   * reset the form field */

  calculateScore(){
    if(this.frameLength > 9) {
      alert('Game Over :)')
      return;
    }

    if(this.scoreForm.status== 'INVALID') {
      this.isvalidInput = true;
      return;
    } else {
      this.isvalidInput = false;
    }

    const firstRoll:number = parseInt(this.scoreForm.value.first);
    const secondRoll:number = parseInt(this.scoreForm.value.second);
    const thirdRoll:number = parseInt(this.scoreForm.value.third);



    this.store.dispatch(addRound({frame:{'first': firstRoll, 'second':secondRoll, third: thirdRoll}}));
    if((firstRoll === 10 || firstRoll + secondRoll === 10) && this.frameLength !==  10) {
        this.isSpareorStrike = true;
    } else {
        this.isSpareorStrike = false;
    }
    this.scoreForm.reset();
    this.scoreForm.controls.second.enable();
  }

}
