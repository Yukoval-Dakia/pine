export interface Scientist {
  _id?: string;
  name: string;
  title?: string;
  description?: string;
  achievements?: string[];
  birthYear?: number;
  deathYear?: number;
  subject: string;
  color: string;
  image: string;
  thumbnail: string;
  createdAt?: string;
  updatedAt?: string;
  fallbackImage?: string;
  fallbackThumbnail?: string;
}

export const scientists: Scientist[] = []; 