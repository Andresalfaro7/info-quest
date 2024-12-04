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
  addRegisterBlog(blog: RegisterBlog): Observable<any> {
    return this.firebaseServices.createBlog(blog);
  }

  // Update appointment by id
  updateaBlog(index: number, blog: RegisterBlog) {
    let blogUpdate = this.blogs[index];
    blogUpdate.title = blog.title;
    blogUpdate.subtitle = blog.subtitle;
    blogUpdate.author = blog.author;
    blogUpdate.article = blog.article;
    blogUpdate.today = blog.today;
  }

  // Update appointment
  updateBlog(id: string, blog: RegisterBlog): Observable<any> {
    return this.firebaseServices.updateBlog(id, blog);
  }

  // Get appointment by id
  getBlogById(id: string): Observable<any> {
    return this.firebaseServices.getBlogById(id);
  }

  // Delete appointment by id
  deleteBlog(id: string): Observable<any> {
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
