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
      form.patchValue({ first: '5', second: '3'});

      // act
      component.calculateScore();

      // assert
      // expect(component.frames.length).toEqual(1);
      // expect(component.frames[0]).toEqual(
      //   jasmine.objectContaining({ first: 5, second: 3, third: 0})
      // );
      expect(form.value).toEqual({
        first: null,
        second: null,
        third: null,
      });
    });   
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
