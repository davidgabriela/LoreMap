import { LayoutModule } from '@angular/cdk/layout';
import { CdkTreeModule } from '@angular/cdk/tree';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { CookieService } from 'ngx-cookie-service';
import { QuillModule } from 'ngx-quill';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/auth/login/login.component';
import { DialogBodyComponent } from './components/dialog-body/dialog-body.component';
import { DocumentExpoansionPanelComponent } from './components/document-expoansion-panel/document-expoansion-panel.component';
import { DocumentTreeComponent } from './components/document-tree/document-tree.component';
import { LoreCollectionComponent } from './components/lore-collection/lore-collection.component';
import { MainTextPageComponent } from './components/main-text-page/main-text-page.component';
import { MapPageComponent } from './components/map-page/map-page.component';
import { MapUploadComponent } from './components/map-upload/map-upload.component';
import { MapComponent } from './components/map/map.component';
import { SafeUrlPipe } from './components/map/safe-url.pipe';
import { NavigationComponent } from './components/navigation/navigation.component';
import { AuthInterceptor } from './services/auth/auth-interceptor';
import { DocumentPageComponent } from './components/document-page/document-page.component';

@NgModule({
  declarations: [
    AppComponent,
    MapUploadComponent,
    NavigationComponent,
    DialogBodyComponent,
    LoreCollectionComponent,
    LoginComponent,
    MainTextPageComponent,
    MapPageComponent,
    MapComponent,
    SafeUrlPipe,
    DocumentTreeComponent,
    DocumentExpoansionPanelComponent,
    DocumentPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    LayoutModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatDialogModule,
    MatInputModule,
    MatProgressSpinnerModule,
    QuillModule,
    LeafletModule,
    CdkTreeModule,
    MatExpansionModule,
  ],
  providers: [
    CookieService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
