import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/photos',
    pathMatch: 'full',
  },
  {
    path: 'photos',
    loadChildren: () =>
      import('./photos/photos.module').then((m) => m.PhotosModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
