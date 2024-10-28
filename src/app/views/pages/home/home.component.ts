import { Component, OnInit } from '@angular/core';
import { ApiNasaService } from '../../../services/api-nasa-home.service';
import { CommonModule } from '@angular/common';
import {AsteroidNear, ImageDay} from '../../../interfaces/interface.home.model';
import { SidebarComponent } from '../../partials/sidebar/sidebar.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, SidebarComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  today:string = `${(new Date()).getFullYear()}-${(new Date()).getMonth()+1}-${(new Date()).getDate() < 10 ? '0'+(new Date()).getDate() : (new Date()).getDate()}`;
  imgAsteroid = 'assets/images/asteroids.png';
  imageData: string = '';
  errorMessage: string = '';
  imageDay: ImageDay;
  asteroidNear: AsteroidNear;

  constructor( private apiService: ApiNasaService ){ }

  ngOnInit(){
    this.getImageDay();
    this.getAsteroid();
  }

  async getImageDay(){
    try {
      const dataImage = await this.apiService.getImageDay();
      console.log('Image URL:', dataImage);
      if(!dataImage.success){
        throw new Error(dataImage.message);
      }
      this.imageDay = dataImage.data;
    } catch (error) {
      console.error('Error al obtener la imagen:', error);
    }
  }

  async getAsteroid(){
    try {
      const dataAsteroid = await this.apiService.getAsteroid();
      console.log('Image URL:', dataAsteroid);
      if(!dataAsteroid.success){
        throw new Error(dataAsteroid.message);
      }
      if(dataAsteroid.data.near_earth_objects[this.today].length > 0){
        this.asteroidNear = dataAsteroid.data.near_earth_objects[this.today][0];
        console.log(dataAsteroid.data.near_earth_objects[this.today][0]);
      }
    } catch (error) {
      console.error('Error al obtener la imagen:', error);
    }
  }
}
