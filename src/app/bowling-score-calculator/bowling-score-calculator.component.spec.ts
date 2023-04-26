import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BowlingScoreCalculatorComponent } from './bowling-score-calculator.component';
import { ReactiveFormsModule } from '@angular/forms';
import { counterReducer } from '../score-state-store/score.reducer';
import { provideMockStore } from '@ngrx/store/testing';
import { StoreModule } from '@ngrx/store';
import { HeaderComponent } from '../header/header.component';



describe('BowlingScoreCalculatorComponent', () => {
  let component: BowlingScoreCalculatorComponent;
  let fixture: ComponentFixture<BowlingScoreCalculatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BowlingScoreCalculatorComponent, HeaderComponent ],
      imports: [ReactiveFormsModule, StoreModule.forRoot({ score: counterReducer })],
      providers: [provideMockStore({})]
    }).compileComponents();

    fixture = TestBed.createComponent(BowlingScoreCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('calculateScore', () => {
    it('should add frame to frames array and reset the form', () => {
      // arrange
      const form = component.scoreForm;
      form.patchValue({ first: 5, second: 3, third: null});

      // act
      component.calculateScore();

      //assert
      expect(component.frameLength).toEqual(0);
      expect(component.frames$).toEqual(
        jasmine.objectContaining({})
      );
      expect(form.value).toEqual({
        first: null,
        second: null,
        third: null,
      });
    });   
  });

  
  describe('calculateBowlingScore', () => {
    it('should take frames array as input and return the score of the game', () => {
      // arrange
      const frames = [{ first: 5, second: 3}]

      // act
      let score = component.calculateBowlingScore(frames);

      //assert
      expect(score).toEqual(
        jasmine.objectContaining({'score':8})
      );
    });  
    
    it('should take frames array as input and return the score of the game', () => {
      // arrange
      const frames = [{ first: 5, second: 3},{ first: 5, second: 5},{ first: 4, second: 3},{ first:10, second: null},
        { first: 6, second: 3},{ first: 3, second: 7},{ first: 4, second: 2} ];

      // act
      let score = component.calculateBowlingScore(frames);

      //assert
      expect(score).toEqual(
        jasmine.objectContaining({'score':77})
      );
    });

    it('should take frames array as input and return the score of the game', () => {
      // arrange
      const frames = [{ first: 5, second: 3},{ first: 5, second: 5},{ first: 4, second: 3},{ first:10, second: null},
        { first: 6, second: 3},{ first: 3, second: 7},{ first: 4, second: 2}, { first: 8, second: 2}, { first: 4, second: 6}, { first: 10, second: 4, third :5}];

      // act
      let score = component.calculateBowlingScore(frames);

      //assert
      expect(score).toEqual(
        jasmine.objectContaining({'score':130})
      );
    });

    it('should take frames array as input and return the score of the game', () => {
      // arrange
      const frames = [{ first: 5, second: 3},{ first: 5, second: 5},{ first: 4, second: 3},{ first:10, second: null},
        { first: 6, second: 3},{ first: 3, second: 7},{ first: 4, second: 2} ];

      // act
      let score = component.calculateBowlingScore(frames);

      //assert
      expect(score).toEqual(
        jasmine.objectContaining({'score':77})
      );
    });

    it('Check maximum score of the game', () => {
      // arrange
      const frames =  [{ first: 10, second: 0},{ first: 10, second: 0},{ first: 10, second: 0},{ first:10, second: 0},
        { first: 10, second: 0},{ first: 10, second: 0},{ first: 10, second: 0}, { first: 10, second: 0}, { first: 10, second: 0}, { first: 10, second: 10, third :10}];

      // act
      let score = component.calculateBowlingScore(frames);

      //assert
      expect(score).toEqual(
        jasmine.objectContaining({'score':300})
      );
    });
  });




  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
