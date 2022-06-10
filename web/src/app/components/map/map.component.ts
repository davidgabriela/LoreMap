import { AfterViewInit, Component, Input } from '@angular/core';
import * as L from 'leaflet';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements AfterViewInit {
  @Input() sourceImage: Observable<any> = new Observable();
  private map: any;

  options = {
    maxZoom: 4,
    minZoom: -5,
    crs: L.CRS.Simple,
  };

  private initMap(): void {
    this.sourceImage.subscribe((res) => {
      this.map = L.map('map', {
        maxZoom: 4,
        minZoom: -5,
        crs: L.CRS.Simple,
      });

      var bounds: [number, number][] = [
        [0, 0],
        [1000, 1000],
      ];

      const imgUrl = `data:${res.imageFile['mimetype']};base64,${res.imageFile['data']}`;
      console.log('src?', imgUrl);
      var image = L.imageOverlay(imgUrl, bounds).addTo(this.map);

      this.map.fitBounds(bounds);
    });
  }

  // this.map.on('click', function(e: any) {
  //   alert(e.latlng)
  // })

  constructor() {}

  ngAfterViewInit(): void {
    this.initMap();
  }
}
