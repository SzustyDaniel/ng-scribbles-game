import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'nsg-game-canvas',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './game-canvas.component.html',
  styleUrls: ['./game-canvas.component.scss'],
})
export class GameCanvasComponent implements AfterViewInit {
  @ViewChild('canvas') canvasRef!: ElementRef<HTMLCanvasElement>;

  private ctx!: CanvasRenderingContext2D;
  private isDrawing = false;
  private lastX = 0;
  private lastY = 0;

  brushSize = 10;
  brushColor = '#000000';
  isErasing = false;

  ngAfterViewInit(): void {
    const canvas = this.canvasRef?.nativeElement;
    if (canvas) {
      this.ctx = canvas.getContext('2d')!;
    }

    this.resizeCanvas();

    window.addEventListener('resize', () => {
      this.resizeCanvas();
    });

    // if user release mouse outside of canvas area finish drawing session
    window.addEventListener('mouseup', () => {
      this.handleMouseUp();
    });
  }

  handleMouseDown(event: MouseEvent) {
    if (this.ctx) {
      const { canvasX, canvasY } = this.GetCanvasXY(event);
      this.isDrawing = true;
      [this.lastX, this.lastY] = [canvasX, canvasY];

      this.drawDot(canvasX, canvasY);
    }
  }

  handleMouseMove(event: MouseEvent) {
    if (!this.isDrawing || !this.ctx) return;
    const { canvasX, canvasY } = this.GetCanvasXY(event);
    this.ctx.lineJoin = 'round';
    this.ctx.lineCap = 'round';
    this.ctx.beginPath();
    this.ctx.moveTo(this.lastX, this.lastY);
    this.ctx.lineTo(canvasX, canvasY);
    this.ctx.strokeStyle = !this.isErasing ? this.brushColor : '#FFF';
    this.ctx.lineWidth = this.brushSize;
    this.ctx.stroke();
    [this.lastX, this.lastY] = [canvasX, canvasY];
  }

  handleMouseUp() {
    this.isDrawing = false;
  }

  // Resizes the canvas to fit the parent element
  // Saves the current canvas image and redraws it after resizing
  resizeCanvas() {
    const canvas = this.canvasRef.nativeElement;
    const parent = canvas.parentElement ?? document.body;
    const savedImage = canvas.toDataURL();

    canvas.width = parent.clientWidth ?? window.innerWidth;
    canvas.height = parent.clientHeight ?? window.innerHeight;

    const img = new Image();
    img.onload = () => {
      this.ctx.drawImage(img, 0, 0);
    };
    img.src = savedImage;
  }

  // Draws a dot on the canvas at the given x and y coordinates
  drawDot(x: number, y: number) {
    if (!this.ctx) return;
    this.ctx.beginPath();
    this.ctx.arc(x, y, this.brushSize / 2, 0, Math.PI * 2);
    this.ctx.fillStyle = !this.isErasing ? this.brushColor : '#FFF';
    this.ctx.fill();
  }

  // Takes the mouse event and returns the x and y coordinates of the mouse on the canvas
  // Considers canvas size and scale to keep the mouse position accurate regardless of canvas size
  private GetCanvasXY(event: MouseEvent) {
    const rect = this.canvasRef.nativeElement.getBoundingClientRect();
    const scaleX = this.canvasRef.nativeElement.width / rect.width;
    const scaleY = this.canvasRef.nativeElement.height / rect.height;
    const canvasX = (event.clientX - rect.left) * scaleX;
    const canvasY = (event.clientY - rect.top) * scaleY;
    return { canvasX, canvasY };
  }

  toggleEraser() {
    this.isErasing = !this.isErasing;
    }
    
}
