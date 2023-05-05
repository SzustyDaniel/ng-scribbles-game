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

  ngAfterViewInit(): void {
    const canvas = this.canvasRef?.nativeElement;
    if (canvas) {
      this.ctx = canvas.getContext('2d')!;
      this.ctx.strokeStyle = '#000';
      this.ctx.lineJoin = 'round';
      this.ctx.lineWidth = 1000;
    }

    this.resizeCanvas();

    window.addEventListener('resize', () => {
      this.resizeCanvas();
    });

    window.addEventListener('mouseup', () => {
      this.handleMouseUp();
    });
  }

  handleMouseDown(event: MouseEvent) {
    if (this.ctx) {
      const rect = this.canvasRef.nativeElement.getBoundingClientRect();
      const scaleX = this.canvasRef.nativeElement.width / rect.width;
      const scaleY = this.canvasRef.nativeElement.height / rect.height;
      const canvasX = (event.clientX - rect.left) * scaleX;
      const canvasY = (event.clientY - rect.top) * scaleY;
      this.isDrawing = true;
      [this.lastX, this.lastY] = [canvasX, canvasY];

      this.drawDot(canvasX, canvasY);
    }
  }

  handleMouseMove(event: MouseEvent) {
    if (!this.isDrawing || !this.ctx) return;
    const rect = this.canvasRef.nativeElement.getBoundingClientRect();
    const scaleX = this.canvasRef.nativeElement.width / rect.width;
    const scaleY = this.canvasRef.nativeElement.height / rect.height;
    const canvasX = (event.clientX - rect.left) * scaleX;
    const canvasY = (event.clientY - rect.top) * scaleY;
    this.ctx.lineJoin = 'round';
    this.ctx.lineCap = 'round';
    this.ctx.beginPath();
    this.ctx.moveTo(this.lastX, this.lastY);
    this.ctx.lineTo(canvasX, canvasY);
    this.ctx.strokeStyle = this.brushColor;
    this.ctx.lineWidth = this.brushSize;
    this.ctx.stroke();
    [this.lastX, this.lastY] = [canvasX, canvasY];
  }

  handleMouseUp() {
    this.isDrawing = false;
  }

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

  drawDot(x: number, y: number) {
    if (!this.ctx) return;
    this.ctx.beginPath();
    this.ctx.arc(x, y, this.brushSize / 2, 0, Math.PI * 2);
    this.ctx.fillStyle = this.brushColor;
    this.ctx.fill();
  }
}
