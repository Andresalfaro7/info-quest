import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-preloader',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './preloader.component.html',
  styleUrl: './preloader.component.css'
})
export class PreloaderComponent implements OnInit, OnDestroy{
  isLoading: boolean = true;
  timeOutId: ReturnType<typeof setTimeout>;

  ngOnInit(): void {
    this.startPreloader();
  }

  ngOnDestroy(): void {
    clearTimeout(this.timeOutId);
  }

  startPreloader(){
    this.timeOutId = setTimeout(() => {
      this.isLoading = false;
    }, 5000);
  }
}
