
import { Routes } from '@angular/router';

export const appRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () =>
      import('@soundcloud-clone/discover-feature').then(
        (m) => m.DiscoverFeature
      ),
  },
  {
    path: '**',
    redirectTo: '',
  },
];

