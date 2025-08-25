import { Component } from '@angular/core';
import { CardsComponent } from '../../../components/cards/cards.component';
import { RegisterBlogComponent } from '../../../components/modals/register-blog/register-blog.component';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CardsComponent, RegisterBlogComponent],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.css'
})
export class BlogComponent {
  
}
