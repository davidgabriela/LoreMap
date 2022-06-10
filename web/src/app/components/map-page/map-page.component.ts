import { Component, OnInit, SecurityContext } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Map } from 'src/app/models/Map';
import { MapsService } from 'src/app/services/maps/maps.service';

@Component({
  selector: 'app-map-page',
  templateUrl: './map-page.component.html',
  styleUrls: ['./map-page.component.scss'],
})
export class MapPageComponent implements OnInit {
  public routeSub: Subscription = new Subscription();
  public routeId: string = '';
  public imageData: Observable<any> = new Observable();

  constructor(
    private mapsService: MapsService,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer
  ) {}

  getMapId = () => {
    this.routeSub = this.route.params.subscribe((params) => {
      this.routeId = params['id'];
    });
  };

  sanitizeData = (file: Map) => {
    const url = `url(data:${file.imageFile['mimetype']};base64${file.imageFile['data']})`;
    return this.sanitizer.sanitize(
      SecurityContext.RESOURCE_URL,
      this.sanitizer.bypassSecurityTrustResourceUrl(url)
    );
  };

  ngOnInit(): void {
    this.getMapId();
    console.log(this.routeId);
    //this.imageData = `data:${res.imageFile['mimetype']};base64,${res.imageFile['data']}`;
    this.imageData = this.mapsService.getMap(this.routeId);
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }
}
