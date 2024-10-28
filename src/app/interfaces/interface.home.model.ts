export interface ImageDay {
    url: string;
    hdurl: string;
    title: string;
    explanation:string;
    date: string;
    copyright: string
}

export interface AsteroidNear {
    name: string;
    is_potentially_hazardous_asteroid: boolean;
    estimated_diameter: any;
    explanation:string;
    nasa_jpl_url: string;
}
  