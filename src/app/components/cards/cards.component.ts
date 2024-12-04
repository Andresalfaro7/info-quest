import { Component } from '@angular/core';
import { RegisterBlog } from '../../interfaces/register-blog.model';
import { BlogService } from '../../services/blog.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-cards',
  standalone: true,
  imports: [CommonModule, RouterModule, ],
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.css'
})
export class CardsComponent {
  constructor( private blogServices: BlogService ){}
  // show: string = "collapse";
  appointmentList: RegisterBlog;
  blogs: RegisterBlog[];

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
    this.blogServices.deleteAppointmnet(id).subscribe({
      next: () => {
        console.log('Blog eliminado exitosamente');
        this.loadBlogs();
      },
      error: (error) => {
        console.error('Error al eliminar el blog:', error);
      }
    });
  }

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
