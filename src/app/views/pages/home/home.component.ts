import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ApiNasaService } from '../../../services/api-nasa-home.service';
import { CommonModule } from '@angular/common';
import {AsteroidNear, ImageDay, RoverGallery} from '../../../interfaces/interface.home.model';
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
  roverGallery: RoverGallery[] = [
      {img_src: "/assets/images/rovers1.jpg"},
      {img_src: "/assets/images/rovers2.jpg"},
      {img_src: "/assets/images/rovers3.jpg"},
      {img_src: "/assets/images/rovers4.jpg"},
      {img_src: "/assets/images/rovers5.jpg"},
  ]
  apoloImages: string[];

  @ViewChild('videoBg') video!: ElementRef<HTMLVideoElement>;

  constructor( private apiService: ApiNasaService ){  }

  ngOnInit(){
    this.getImageDay();
    this.getAsteroid();
    this.getGallery();
    this.getApoloImages();
  }

  ngAfterViewInit() {
    this.videoBg();
  }

  async getImageDay(){
    try {
      const dataImage = await this.apiService.getImageDay();
      console.log('Image URL:', dataImage);
      if(!dataImage.success) throw new Error(dataImage.message);
      this.imageDay = dataImage.data as ImageDay;
    } catch (error) {
      console.error('Error al obtener la imagen:', error);
    }
  }

  async getAsteroid(){
    try {
      const dataAsteroid = await this.apiService.getAsteroid();
      console.log('Image URL Asteroid:', dataAsteroid);
      if(!dataAsteroid.success) throw new Error(dataAsteroid.message);
      if(Array.isArray(dataAsteroid.data) && dataAsteroid.data.length > 0){
        this.asteroidNear = dataAsteroid.data[0] as AsteroidNear;
      } else {
        this.asteroidNear = dataAsteroid.data as unknown as AsteroidNear;
      }
    } catch (error) {
      console.error('Error al obtener la imagen:', error);
    }
  }

  async getGallery(){
    try {
      const dataGallery = await this.apiService.getGalleryHeart();
      console.log(dataGallery);
      if(!dataGallery.success) throw new Error(dataGallery.message);
      this.roverGallery = (dataGallery.data as RoverGallery[]).slice(-5);
    } catch (error) {
      console.log('Rover',this.roverGallery);
      console.error('Error al obtener la imagen:', error);
    }
  }

  async getApoloImages(){
    try {
      const dataApolo = await this.apiService.getApolo();
      console.log(dataApolo);
      if(!dataApolo.success) throw new Error(dataApolo.message);
      if(Array.isArray(dataApolo.data)){
        this.apoloImages = (dataApolo.data as string[]).slice(-70, -1);
      }
      console.log('Apolo',this.apoloImages);
    } catch (error) {
      console.log('Apolo',this.apoloImages);
      console.error('Error al obtener la imagen:', error);
    }
  }

  videoBg(){
    const videoElement = this.video.nativeElement;
    videoElement.muted = true;
    videoElement.autoplay = true;
    videoElement.loop = true;
    videoElement.play().catch(error => {
      console.error("No se pudo reproducir el video automáticamente:", error);
    });
  }

}
