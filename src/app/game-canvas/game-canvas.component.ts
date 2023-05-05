import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'nsg-game-canvas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './game-canvas.component.html',
  styleUrls: ['./game-canvas.component.scss'],
})
export class GameCanvasComponent implements AfterViewInit {
  @ViewChild('canvas') canvasRef!: ElementRef<HTMLCanvasElement>;

  private ctx!: CanvasRenderingContext2D;

  private isDrawing = false;
  private lastX = 0;
  private lastY = 0;

  ngAfterViewInit(): void {
    const canvas = this.canvasRef?.nativeElement;
    if (canvas) {
      this.ctx = canvas.getContext('2d')!;
      this.ctx.strokeStyle = '#000';
      this.ctx.lineJoin = 'round';
      this.ctx.lineWidth = 5;
    }

    this.resizeCanvas();

    window.addEventListener('resize', () => {
      this.resizeCanvas();
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
    }
  }

  handleMouseMove(event: MouseEvent) {
    if (!this.isDrawing || !this.ctx) return;
    const rect = this.canvasRef.nativeElement.getBoundingClientRect();
    const scaleX = this.canvasRef.nativeElement.width / rect.width;
    const scaleY = this.canvasRef.nativeElement.height / rect.height;
    const canvasX = (event.clientX - rect.left) * scaleX;
    const canvasY = (event.clientY - rect.top) * scaleY;
    this.ctx.beginPath();
    this.ctx.moveTo(this.lastX, this.lastY);
    this.ctx.lineTo(canvasX, canvasY);
    this.ctx.stroke();
    [this.lastX, this.lastY] = [canvasX, canvasY];
  }

  handleMouseUp() {
    this.isDrawing = false;
  }

  resizeCanvas() {
    const canvas = this.canvasRef.nativeElement;
    const parent = canvas.parentElement ?? document.body;
    canvas.width = parent.clientWidth ?? window.innerWidth;
    canvas.height = parent.clientHeight ?? window.innerHeight;
  }
}
