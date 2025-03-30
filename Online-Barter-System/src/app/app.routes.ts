import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'main',
        loadChildren: () => import('./main/modules/main.module').then(m => m.MainModule)
    },
    {
        path: '',
        redirectTo: 'main',
        pathMatch: 'full'
    }
];
