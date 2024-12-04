import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { PreloaderComponent } from './components/preloader/preloader.component';
import { ButtonToTopComponent } from './components/button-to-top/button-to-top.component';
import { SidebarComponent } from './views/partials/sidebar/sidebar.component';
import firebase from 'firebase/compat/app';
import { BlogService } from './services/blog.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, PreloaderComponent, ButtonToTopComponent, SidebarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit{
  title = 'Info Quest';

  constructor(private blogService: BlogService, private router: Router){ }

  ngOnInit(): void {
    const firebaseConfig = {
      apiKey: "AIzaSyA4N7E8Gw-ebMTc93eJdhnWZ6pkLwqSr4E",
      authDomain: "info-quest-f4fd4.firebaseapp.com",
    };

    // !this.isAuth() && this.router.navigate(['/login']);
  }
}
