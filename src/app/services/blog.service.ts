import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { FirebaseService } from './firebase.service';
import { RegisterBlog } from '../interfaces/register-blog.model';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(private firebaseServices: FirebaseService) { }

  blogs: RegisterBlog[] = [];
  newBlog = new RegisterBlog('', '', '', '', '', new Date());

  getBlogs(): Observable<any> {
    return this.firebaseServices.getBlogs();
  }

  // Load all appointmnets
  loadBlogs(): void {
    this.firebaseServices.getBlogs().subscribe({
      next: (data) => {
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
        console.log(this.blogs);
      },
      error: (error) => {
        console.error('Error al cargar citas:', error);
      }
    });
  }

  // Add new appointment
  addRegisterappointment(appointment: RegisterBlog): Observable<any> {
    return this.firebaseServices.createBlog(appointment);
  }

  // Update appointment by id
  updateaAppointment(index: number, appointment: RegisterBlog) {
    let blogUpdate = this.blogs[index];
    blogUpdate.title = appointment.title;
    blogUpdate.subtitle = appointment.subtitle;
    blogUpdate.author = appointment.author;
    blogUpdate.article = appointment.article;
    blogUpdate.today = appointment.today;
  }

  // Update appointment
  updateBlog(id: string, appointment: RegisterBlog): Observable<any> {
    return this.firebaseServices.updateBlog(id, appointment);
  }

  // Get appointment by id
  getBlogById(id: string): Observable<any> {
    return this.firebaseServices.getBlogById(id);
  }

  // Delete appointment by id
  deleteAppointmnet(id: string): Observable<any> {
    const result = window.confirm('¿Estás seguro de que quieres continuar?');
    if (result) {
      console.log('El usuario confirmó la acción.');
      return this.firebaseServices.deleteBlog(id);
    } else {
      console.log('El usuario canceló la acción.');
      return of(null);
    }
  }

  // Show message by alert
  showMessage(message: string) {
    alert(message);
  }
}
