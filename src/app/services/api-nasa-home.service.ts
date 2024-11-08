import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { ImageDay } from '../interfaces/interface.home.model';
import { dataResponse } from '../interfaces/interface.global.model';

@Injectable({
  providedIn: 'root'
})
export class ApiNasaService {

  today: string = `${(new Date()).getFullYear()}-${(new Date()).getMonth() + 1}-${(new Date()).getDate() < 10 ? '0' + (new Date()).getDate() : (new Date()).getDate()}`;
  imageDay: dataResponse;
  asteroidNear: dataResponse;
  apoloData: dataResponse;

  constructor() { }

  async getImageDay(): Promise<dataResponse> {
    try {
      const response = await fetch(
        `${environment.apiNasa}/planetary/apod?api_key=${environment.apiKeyNasa}`
      );
      if (!response.ok) throw new Error('Error en la solicitud a la API de la NASA');
      this.imageDay = {
        success: true,
        message: "Información de la imagen del día exitosa",
        data: await response.json()
      }
      return this.imageDay;
    } catch (error) {
      this.imageDay = {
        success: false,
        message: "Verifique la información " + error,
        data: null
      }
      return this.imageDay;
    }
  }

  async getAsteroid(): Promise<dataResponse> {
    console.log(this.today);
    try {
      const response = await fetch(
        `${environment.apiNasa}/neo/rest/v1/feed?start_date=${this.today}&end_date=${this.today}&api_key=${environment.apiKeyNasa}`
      );
      if (!response.ok) throw new Error('Error en la solicitud a la API de la NASA');
      let data = await response.json();
      this.asteroidNear = {
        success: true,
        message: "Información de asteroides cercanos exitosa",
        data: data.near_earth_objects[this.today]
      }
      return this.asteroidNear;
    } catch (error) {
      console.log(error);
      this.asteroidNear = {
        success: false,
        message: "Verifique la información " + error,
        data: null
      }
      return this.asteroidNear;
    }
  }

  async getGalleryHeart(): Promise<dataResponse> {
    try {
      const response = await fetch(
        `${environment.apiNasa}/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=${environment.apiKeyNasa}`
      );
      console.log(response);
      if (!response.ok) throw new Error('Error en la solicitud a la API de la NASA');
      let data = await response.json();
      this.asteroidNear = {
        success: true,
        message: "Información de imagenes de la tierra exitosa",
        data: data.photos
      }
      return this.asteroidNear;
    } catch (error) {
      this.asteroidNear = {
        success: false,
        message: "Verifique la información " + error,
        data: null
      }
      return this.asteroidNear;
    }
  }

  async getApolo() {
    try {
      const response = await fetch(
        `https://images-assets.nasa.gov/video/Apollo%2011%20For%20All%20Mankind/collection.json`
      );
      console.log(response);
      if (!response.ok) throw new Error('Error en la solicitud a la API de la NASA');
      this.apoloData = {
        success: true,
        message: "Información del apolo exitosa",
        data: await response.json()
      }
      return this.apoloData;
    } catch (error) {
      this.apoloData = {
        success: false,
        message: "Verifique la información " + error,
        data: null
      }
      return this.apoloData;
    }
  }
}
