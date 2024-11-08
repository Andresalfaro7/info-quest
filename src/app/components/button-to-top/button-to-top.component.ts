import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-button-to-top',
  standalone: true,
  imports: [],
  templateUrl: './button-to-top.component.html',
  styleUrl: './button-to-top.component.css'
})
export class ButtonToTopComponent {
  showButton = false;

  @HostListener('window:scroll')
  onWindowScroll() {
    // Muestra el botón solo si se hace scroll hacia abajo
    this.showButton = window.scrollY > 300;
  }

  scrollToTop(): void {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
}
