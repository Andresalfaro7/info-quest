import { Component, OnInit } from '@angular/core';
import { ApiNasaService } from '../../../services/api-nasa-home.service';
import { CommonModule } from '@angular/common';
import {ImageDay} from '../../../interfaces/interface.home.model';
import { SidebarComponent } from '../../partials/sidebar/sidebar.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, SidebarComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  imageData: string = '';
  errorMessage: string = '';
  imageDay: ImageDay = {title:'', url:'', hdurl:'', explanation:'', date:'', copyright:''}

  constructor( private apiService: ApiNasaService ){ }

  async ngOnInit(): Promise<void> {
    try {
      const data = await this.apiService.getImageDay();
      this.imageDay = data;
      console.log('Image URL:', data);
    } catch (error) {
      console.error('Error al obtener la imagen:', error);
    }
  }
}
