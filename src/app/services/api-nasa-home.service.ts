import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiNasaService {

  constructor() { }

  async getImageDay(): Promise<any> {
    const response = await fetch(
      `${environment.apiNasa}/planetary/apod?api_key=${environment.apiKeyNasa}`
    );
    if (!response.ok) {
      throw new Error('Error en la solicitud a la API de la NASA');
    }
    return await response.json();
  }
}
