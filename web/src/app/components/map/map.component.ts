import { Component, Input, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { imageOverlay, latLng, Layer, marker } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
  @Input() sourceImage: Observable<any> = new Observable();

  // showCoords = (e: any) => {
  //   console.log(e);
  //   var marker = L.marker(e.latlng, { alt: 'new' })
  //     .addTo(map) // "Kyiv" is the accessible name of this marker
  //     .bindPopup('Kyiv, Ukraine is the birthplace of Leaflet!');
  // };

  options = {
    crs: L.CRS.Simple,
    minZoom: -5,
    zoom: 5,
    center: latLng(0, 0),
  };

  layers: Layer[] = [];

  public initMap(map: any): void {
    this.sourceImage.subscribe((res) => {
      const imgUrl = `data:${res.imageFile['mimetype']};base64,${res.imageFile['data']}`;
      const imgBounds: L.LatLngBoundsExpression = [
        [0, 0],
        // TODO: Igrab from image data
        [1000, 1500],
      ];
      const overlay = imageOverlay(imgUrl, imgBounds).addTo(map);

      map.fitBounds(imgBounds);

      map.on('contextmenu', (e: any) => {
        console.log(e.latLng);
        var s = marker(e.latlng, { alt: 'new' })
          .addTo(map)
          .bindPopup('Kyiv, Ukraine is the birthplace of Leaflet!');
      });
      // this.layers.push(overlay);
    });
  }

  constructor() {}
  ngOnInit(): void {
    L.Icon.Default.imagePath = 'assets/leaflet/';
  }
}
