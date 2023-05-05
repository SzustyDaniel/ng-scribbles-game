import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WordGuessComponent } from './word-guess.component';

describe('WordGuessComponent', () => {
  let component: WordGuessComponent;
  let fixture: ComponentFixture<WordGuessComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [WordGuessComponent]
    });
    fixture = TestBed.createComponent(WordGuessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
