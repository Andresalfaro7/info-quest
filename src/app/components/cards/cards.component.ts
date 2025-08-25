import { Component, ElementRef, ViewChild } from '@angular/core';
import { RegisterBlog } from '../../interfaces/register-blog.model';
import { BlogService } from '../../services/blog.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Modal } from 'bootstrap';
import { EditBlogComponent } from '../modals/edit-blog/edit-blog.component';

@Component({
  selector: 'app-cards',
  standalone: true,
  imports: [CommonModule, RouterModule, EditBlogComponent],
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.css'
})
export class CardsComponent {
  constructor( private blogServices: BlogService ){}
  // show: string = "collapse";
  appointmentList: RegisterBlog;
  blogs: RegisterBlog[];
  id: string;

  @ViewChild('exampleModal') modalElement!: ElementRef; // Revisa el nombre 'exampleModal'
  private modalInstance!: Modal;

  ngOnInit(): void {
    this.blogs = this.blogServices.blogs;
    console.log(this.blogServices.blogs);
    this.loadBlogs();
  }

  loadBlogs(): void {
    this.blogServices.getBlogs().subscribe({
      next: (data) => {
        if(data !== null || data !== undefined){
          this.blogs = Object.keys(data || {}).map((key) => {
            const blogData = { ...data[key] };
            return new RegisterBlog(
              key,
              blogData.title,
              blogData.subtitle,
              blogData.author,
              blogData.article,
              blogData.today,
            );
          });
        }
        console.log(this.blogs);
      },
      error: (error) => {
        console.error('Error al cargar blogs:', error);
      }
    });
  }

  deleteBlog(id: string): void {
    this.blogServices.deleteBlog(id).subscribe({
      next: () => {
        console.log('Blog eliminado exitosamente');
        this.loadBlogs();
      },
      error: (error) => {
        console.error('Error al eliminar el blog:', error);
      }
    });
  }

  @ViewChild(EditBlogComponent) modalComponent!: EditBlogComponent;

  calculateAge(birthDate: Date|string): number {
    // console.log(birthDate);
    const today = new Date();
    const birthDatePerson = new Date(birthDate);
    let age = today.getFullYear() - birthDatePerson.getFullYear();
    const month = today.getMonth() - birthDatePerson.getMonth();

    if (month < 0 || (month === 0 && today.getDate() < birthDatePerson.getDate())) {
      age--;
    }
    return age;
  }

  formatDate(date: Date | string): string {
    // console.log(date);
    let dateAppointment = new Date(date);
    const day = dateAppointment.getDate().toString().padStart(2, '0');
    const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio','Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    const month = meses[dateAppointment.getMonth()];
    const year = dateAppointment.getFullYear();
    return `${day} de ${month} del ${year}`;
  }
}
