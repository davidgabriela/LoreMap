import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { LoreCollectionComponent } from './components/lore-collection/lore-collection.component';
import { MainTextPageComponent } from './components/main-text-page/main-text-page.component';
import { MapUploadComponent } from './components/map-upload/map-upload.component';
import { AuthGuard } from './services/auth/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/lore-collection', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'map-upload',
    component: MapUploadComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'lore-collection',
    component: LoreCollectionComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'write/:id',
    component: MainTextPageComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard],
})
export class AppRoutingModule {}
