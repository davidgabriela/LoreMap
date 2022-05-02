import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoreCollectionComponent } from './components/lore-collection/lore-collection.component';
import { ProfileComponent } from './components/profile/profile.component';

const routes: Routes = [
  { path: '', redirectTo: '/profile', pathMatch: 'full' },
  { path: 'profile', component: ProfileComponent },
  { path: 'lore-collection', component: LoreCollectionComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
