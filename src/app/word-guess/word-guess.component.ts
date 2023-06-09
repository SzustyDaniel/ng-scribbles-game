import { AfterViewInit, Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'nsg-word-guess',
  standalone: true,
  imports: [CommonModule, FormsModule, FontAwesomeModule],
  templateUrl: './word-guess.component.html',
  styleUrls: ['./word-guess.component.scss']
})
export class WordGuessComponent{
  @Input({required: true}) canvasData!: string;
  
  guess: string = "";
  faCheckIcon = faCheck;

  submitGuess(){
    console.log(this.guess);
    alert(`You have submitted your guess! ${this.guess}`);
  }
}
