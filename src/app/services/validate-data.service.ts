import { Injectable } from '@angular/core';
import { RegisterBlog } from '../interfaces/register-blog.model';

@Injectable({
  providedIn: 'root'
})
export class ValidateDataService {

  constructor() { }

  validateForms(data: RegisterBlog): boolean{
    console.log(data);
    if(data.title === "" || data.subtitle === "" || data.author === "" || data.article === ""){
      return false;
    }
    return true;
  }
}
