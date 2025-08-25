import { AfterViewInit, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Modal } from 'bootstrap';
import { BlogService } from '../../../services/blog.service';
import { RegisterBlog } from '../../../interfaces/register-blog.model';
import { ValidateDataService } from '../../../services/validate-data.service';

@Component({
  selector: 'app-register-blog',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register-blog.component.html',
  styleUrl: './register-blog.component.css'
})
export class RegisterBlogComponent implements AfterViewInit {

  constructor(private router: Router, private route:ActivatedRoute, private blogServices: BlogService, private validateDataServices: ValidateDataService){}

  @Input() id: string;

  //Modal actions
  @ViewChild('exampleModal') modalElement!: ElementRef; // Revisa el nombre 'exampleModal'
  private modalInstance!: Modal;

  ngAfterViewInit(): void {
    if (this.modalElement?.nativeElement) {
      this.modalInstance = new Modal(this.modalElement.nativeElement);
    } else {
      console.error('El elemento del modal no está disponible.');
    }
  }

  openModal(): void {
    if (this.modalInstance) {
      this.modalInstance.show();
    }
  }

  closeModal(): void {
    if (this.modalInstance) {
      this.modalInstance.hide();
    }
  }

  // form actions
  @Output() loadData = new EventEmitter<void>();
  
  index: string = '';
  inputTitle: string = "";
  inputSubtitle: string = "";
  inputAuthor: string = "";
  inputArticle: string = "";
  today:Date = new Date();

  ngOnInit(){
    
  }

  loadBlogs(){
    this.loadData.emit();
  }

  saveBlog(): void {
    let blog = new RegisterBlog(this.index, this.inputTitle, this.inputSubtitle, this.inputAuthor, this.inputArticle, this.today);
    let validate = this.validateDataServices.validateForms(blog);
    console.log(validate);
    if(!validate){
      alert('Todos los campos son requeridos');
      return;
    }
    this.blogServices.addRegisterBlog(blog).subscribe({
      next: () => {
        console.log('Blog creado exitosamente');
        this.blogServices.loadBlogs();
        alert('Blog registrado con titulo : '+this.inputTitle);
        this.inputTitle= "";
        this.inputSubtitle= "";
        this.inputAuthor= "";
        this.inputArticle= "";
        this.closeModal();
        this.loadBlogs();
        this.backToHome();
      },
      error: (error) => {
        console.error('Error al crear cita:', error);
      }
    });
  }

  backToHome() {
    this.router.navigate(['/blog']);
  }
}
