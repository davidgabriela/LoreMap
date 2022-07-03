import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MapsService } from 'src/app/services/maps/maps.service';
import { Map } from '../../models/Map';

@Component({
  selector: 'app-map-collection',
  templateUrl: './map-collection.component.html',
  styleUrls: ['./map-collection.component.scss'],
})
export class MapCollectionComponent implements OnInit {
  mapCollection: Observable<Map[]> = new Observable();
  constructor(private mapsService: MapsService, private location: Location) {}

  ngOnInit(): void {
    this.getMaps();
  }

  getMaps(): void {
    const loreId = this.location.path().split('/')[2];
    this.mapCollection = this.mapsService.getMaps(loreId);
    console.log(this.mapCollection);
  }

  addMap(map: Map): void {
    this.mapsService.addMap(map).subscribe(() => {
      this.getMaps();
    });
  }

  removeMap(id: string | undefined): void {
    if (id)
      this.mapsService.removeMap(id).subscribe(() => {
        this.getMaps();
      });
  }
}
