import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Components/login/login.component';
import { authGuard } from './auth.guard';

const routes: Routes = [
  { path: '', component: LoginComponent, pathMatch: 'full' }, //if the url is empty
  { path: 'login', component: LoginComponent, pathMatch: 'full' },
  { path: 'pages', loadChildren: () => import('./Components/layout/layout.module').then(module => module.LayoutModule), canActivate: [authGuard] }, //load the component only when needed, lazyloading
  { path: '**', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
