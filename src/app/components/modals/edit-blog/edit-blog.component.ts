import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Modal } from 'bootstrap';
import { RegisterBlog } from '../../../interfaces/register-blog.model';
import { BlogService } from '../../../services/blog.service';
import { ValidateDataService } from '../../../services/validate-data.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-edit-blog',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './edit-blog.component.html',
  styleUrl: './edit-blog.component.css'
})
export class EditBlogComponent implements OnInit {
  constructor(private router: Router, private route:ActivatedRoute, private blogServices: BlogService, private validateDataServices: ValidateDataService){}
  @Input() idBlog: string;

  //Modal actions
  @ViewChild('modalEdit') modalElement!: ElementRef; // Revisa el nombre 'exampleModal'
  private modalInstance!: Modal;

  inputTitle: string = "";
  inputSubtitle: string = "";
  inputAuthor: string = "";
  inputArticle: string = "";
  today: Date;
  index: string = '';
  selectedBlog: RegisterBlog | null = null;

  // ngOnInit(): void {
  //   console.log(this.idBlog);
  //   this.index = this.idBlog;
  //   console.log(this.index, "Index");
  //   this.getBlogById(this.index);
  // }

  ngOnInit(): void {
    this.index = this.route.snapshot.params['id'];
    this.getBlogById(this.index);
  }

  closeModal(): void {
    if (this.modalInstance) {
      this.modalInstance.hide();
    }
  }

  // form actions
  @Output() loadData = new EventEmitter<void>();

  loadBlogs(){
    this.loadData.emit();
  }

  // Update appointment by id
  updateBlog() :void{
    let appointment = new RegisterBlog(this.index, this.inputTitle, this.inputSubtitle, this.inputAuthor, this.inputArticle, this.today);
    this.blogServices.updateBlog(this.index, appointment).subscribe({
      next: () => {
        console.log('Cita actualizada exitosamente');
        this.blogServices.loadBlogs();
        this.backToHome();
      },
      error: (error) => {
        console.error('Error al actualizar cita:', error);
      }
    });
  }

  // Get appointment by id
  getBlogById(id: string): void {
    this.blogServices.getBlogById(id).subscribe({
      next: (data) => {
        this.selectedBlog = { id, ...data };
        console.log(this.selectedBlog);
        if(this.selectedBlog){
          console.log('Cita obtenida:', this.selectedBlog);
          this.inputTitle = this.selectedBlog.title;
          this.inputSubtitle = this.selectedBlog.subtitle;
          this.inputAuthor = this.selectedBlog.author;
          this.inputArticle = this.selectedBlog.article;
          this.today = this.selectedBlog.today;
        }
      },
      error: (error) => {
        console.error('Error al obtener la cita:', error);
      }
    });
  }

  convertDate(date: Date|string|null): string {
    if(date instanceof Date){
      const año = date.getFullYear();
      const mes = (date.getMonth() + 1).toString().padStart(2, '0');
      const dia = date.getDate().toString().padStart(2, '0');
      return `${año}-${mes}-${dia}`;
    }
    if(typeof date == "string"){
      let dt = new Date(date);
      const año = dt.getFullYear();
      const mes = (dt.getMonth() + 1).toString().padStart(2, '0');
      const dia = dt.getDate().toString().padStart(2, '0');
      return `${año}-${mes}-${dia}`;
    }
    return 'No fecha';
  }

  backToHome() {
    this.router.navigate(['']);
  }
}
