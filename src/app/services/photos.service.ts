import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class PhotosService {
  constructor(private http: HttpClient) {}

  getUnsplashedPhotos(page, perPage): Observable<any> {
    return this.http.get(
      `https://api.unsplash.com/search/collections?page=${page}&per_page=${perPage}&query=landscape`
    );
  }

  getSearchedPhotoFromUnsplash(photoName): Observable<any> {
    return this.http.get(`https://api.unsplash.com/search/collections?query=${photoName}`);
  }
}
