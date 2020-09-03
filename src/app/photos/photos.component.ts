import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { PhotosService } from '../services/photos.service';
import { fromEvent } from 'rxjs';
import {
  map,
  debounceTime,
  distinctUntilChanged,
  switchMap,
} from 'rxjs/operators';
import { BrowserTransferStateModule } from '@angular/platform-browser';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.sass'],
})
export class PhotosComponent implements OnInit, AfterViewInit {
  @ViewChild('searchinput') searchinput: ElementRef;
  photos = [];
  gridView = true;
  pageNumber = 1;
  totalPhotos = 0;
  totalPages = 0;

  constructor(private photosService: PhotosService) {}

  ngOnInit(): void {
    this.fetchPhotoList(1, 12);
  }

  ngAfterViewInit(): void {
    this.registerSubscriptionForSearch();
  }

  registerSubscriptionForSearch(): void {
    fromEvent(this.searchinput.nativeElement, 'input')
      .pipe(
        map((e: KeyboardEvent) => (e.target as HTMLInputElement).value),
        debounceTime(1000),
        distinctUntilChanged(),
        switchMap((value: string) => {
          if (value === '') {
            return this.photosService.getUnsplashedPhotos(1, 12);
          }
          return this.photosService.getSearchedPhotoFromUnsplash(value);
        })
      )
      .subscribe((photos) => {
        this.totalPhotos = photos.total;
        this.totalPages = photos.total_pages;
        this.photos = photos.results;
      });
  }

  fetchPhotoList(page: number, perPage: number): void {
    this.photosService
      .getUnsplashedPhotos(page, perPage)
      .subscribe((photos) => {
        this.totalPhotos = photos.total;
        this.totalPages = photos.total_pages;
        this.photos = photos.results;
      });
  }

  switchPage(switchMode): void {
    switch (switchMode) {
      case 'Initial':
        this.pageNumber = 1;
        break;
      case 'Previous':
        --this.pageNumber;
        break;
      case 'Next':
        ++this.pageNumber;
        break;
      case 'End':
        this.pageNumber = this.totalPages;
        break;
    }
    this.fetchPhotoList(this.pageNumber, 12);
  }
}
