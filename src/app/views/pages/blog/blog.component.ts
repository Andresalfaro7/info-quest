import { Component } from '@angular/core';
import { CardsComponent } from '../../../components/cards/cards.component';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CardsComponent],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.css'
})
export class BlogComponent {

}
