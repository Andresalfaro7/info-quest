import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { RegisterBlog } from '../interfaces/register-blog.model';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  private token:string;
  private dbUrl = 'https://info-quest-f4fd4-default-rtdb.firebaseio.com/blog';

  constructor(private http: HttpClient, private authServices: AuthService) { 
    this.token = this.authServices.getIdToken();
  }

  // Create a new blog
  createBlog(blog: RegisterBlog): Observable<any> {
    return this.http.post(`${this.dbUrl}.json?auth=${this.token}`, blog);
  }

  // Get alls blogs
  getBlogs(): Observable<{ [key: string]: RegisterBlog }> {
    return this.http.get<{ [key: string]: RegisterBlog }>(`${this.dbUrl}.json?auth=${this.token}`);
  }

  // Update appoinment by id
  updateBlog(id: string, blog: RegisterBlog): Observable<any> {
    return this.http.put(`${this.dbUrl}/${id}.json?auth=${this.token}`, blog);
  }

  // Delete blog by id
  deleteBlog(id: string): Observable<any> {
    return this.http.delete(`${this.dbUrl}/${id}.json?auth=${this.token}`);
  }

  // get appoinment by id
  getBlogById(id: string): Observable<any> {
    return this.http.get(`${this.dbUrl}/${id}.json?auth=${this.token}`);
  }
}
