import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { DocumentPageComponent } from './components/document-page/document-page.component';
import { GraphComponent } from './components/graph/graph.component';
import { LoreCollectionComponent } from './components/lore-collection/lore-collection.component';
import { MainTextPageComponent } from './components/main-text-page/main-text-page.component';
import { MapPageComponent } from './components/map-page/map-page.component';
import { MapUploadComponent } from './components/map-upload/map-upload.component';
import { TimelineCollectionComponent } from './components/timeline-collection/timeline-collection.component';
import { TimelineComponent } from './components/timeline/timeline.component';
import { AuthGuard } from './services/auth/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/lore-collection', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'lore-collection/:id/map-upload',
    component: MapUploadComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'lore-collection',
    component: LoreCollectionComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'lore-collection/:id/main',
    component: MainTextPageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'lore-collection/:loreId/maps/:mapId',
    component: MapPageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'lore-collection/:loreId/documents/:documentId',
    component: DocumentPageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'lore-collection/:loreId/timelines',
    component: TimelineCollectionComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'lore-collection/:loreId/timelines/:timelineId',
    component: TimelineComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'lore-collection/:loreId/graph',
    component: GraphComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard],
})
export class AppRoutingModule {}
