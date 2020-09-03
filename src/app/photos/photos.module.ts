import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PhotosRoutingModule } from './photos-routing.module';
import { PhotosComponent } from './photos.component';
import { PhotosService } from '../services/photos.service';

@NgModule({
  declarations: [PhotosComponent],
  imports: [CommonModule, PhotosRoutingModule],
  providers: [PhotosService],
})
export class PhotosModule {}
