import { AsteroidNear, ImageDay, RoverGallery } from "./interface.home.model";

export interface dataResponse { 
    success: boolean, 
    message: string, 
    data: ImageDay | AsteroidNear[] | RoverGallery[] | string[] | null
};