import { AfterViewInit, Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'nsg-word-guess',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './word-guess.component.html',
  styleUrls: ['./word-guess.component.scss']
})
export class WordGuessComponent{
  @Input({required: true}) canvasData!: string;
  
  guess: string = "";

  submitGuess(){
    console.log(this.guess);
  }
}
