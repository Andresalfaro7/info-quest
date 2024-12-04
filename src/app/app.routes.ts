import { Routes } from '@angular/router';
import { HomeComponent } from './views/pages/home/home.component';
import { BlogComponent } from './views/pages/blog/blog.component';
import { PageNotFoundComponent } from './views/pages/page-not-found/page-not-found.component';

export const routes: Routes = [
    {path:'', component: HomeComponent},
    {path:'blog', component: BlogComponent},
    {path: '**', component: PageNotFoundComponent},
];
