import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { Location } from '@angular/common';
import {
  Component,
  Input,
  OnInit,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import * as L from 'leaflet';
import { imageOverlay, latLng, Marker, marker, Point } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { filter, fromEvent, Observable, Subscription, take } from 'rxjs';
import { MapsService } from 'src/app/services/maps/maps.service';
import { DialogBodyComponent } from '../dialog-body/dialog-body.component';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
  @Input() mapData: Observable<any> = new Observable();
  @ViewChild('userMenu') userMenu: TemplateRef<any> | undefined;

  closeEventSub: Subscription | undefined;
  overlayRef: OverlayRef | null = null;
  mapRef: any = null;
  clickedPin: boolean = false;
  markerId = 0;

  // Store the coordinates of the last right click
  lastClickedCoords: any = null;

  // List of markers on map
  old_marker: { [key: string]: any } = {};
  markers: { [id: number]: Marker } = {};
  markerData: { lat: number; lng: number; popup: any }[] = [];
  selected_marker: { [key: string]: any } = {};
  toRemove: Marker | null = null;

  options = {
    crs: L.CRS.Simple,
    minZoom: -5,
    zoom: 5,
    center: latLng(0, 0),
  };

  constructor(
    public dialog: MatDialog,
    public overlay: Overlay,
    public viewContainerRef: ViewContainerRef,
    private mapsService: MapsService,
    private location: Location
  ) {}

  ngOnInit(): void {
    L.Icon.Default.imagePath = 'assets/leaflet/';
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogBodyComponent, {
      width: '400px',
      data: {
        dialogTitle: 'Add a new marker',
        dialogLabel: 'Enter a caption for your marker',
        dialogSubmit: 'Add marker',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const caption = result.name;
        console.log('Caption is:  ', caption);
        this.addPinHere(caption);
      }
    });
  }

  public initMap(map: any): void {
    this.mapData.subscribe((res) => {
      const imgUrl = `data:${res.imageFile['mimetype']};base64,${res.imageFile['data']}`;
      const imgBounds: L.LatLngBoundsExpression = [
        [0, 0],
        // TODO: grab from image data
        [1000, 1500],
      ];
      const overlay = imageOverlay(imgUrl, imgBounds).addTo(map);

      map.fitBounds(imgBounds);

      map.on('contextmenu', (e: any) => {
        this.lastClickedCoords = e;
      });

      this.markerData = res.mapData;
      res.mapData.forEach((element: any) => {
        let m = marker([element.lat, element.lng], {
          autoPan: true,
          autoPanPadding: new Point(100, 100),
          draggable: true,
          alt: 'new',
        })
          .addTo(map)
          .bindPopup(element.popup);
        this.markers[this.markerId++] = m;
        m.on('dragstart', (e) => {
          this.dragstartUpdate(m);
        });

        m.on('dragend', (e) => {
          this.drangendUpdate(m);
        });

        m.on('contextmenu', (e) => {
          this.contextUpdate(m);
        });
      });

      console.log(res.mapData, this.markers);

      this.mapRef = map;
    });
  }

  public addPinHere(caption: string) {
    var m = marker(this.lastClickedCoords.latlng, {
      autoPan: true,
      autoPanPadding: new Point(100, 100),
      draggable: true,
      alt: 'new',
    })
      .addTo(this.mapRef)
      .bindPopup(caption);

    m.on('dragstart', (e) => {
      this.dragstartUpdate(m);
    });

    m.on('dragend', (e) => {
      this.drangendUpdate(m);
    });

    m.on('contextmenu', (e) => {
      this.contextUpdate(m);
    });

    this.markers[this.markerId++] = m;
    this.markerData = [
      ...this.markerData,
      {
        lat: m.getLatLng().lat,
        lng: m.getLatLng().lng,
        popup: m.getPopup()?.getContent(),
      },
    ];

    const mapId = this.location.path().split('/')[4];
    this.mapsService.updateMap(mapId, this.markerData).subscribe(() => {});
    this.close();
  }

  dragstartUpdate(m: Marker) {
    const old_coords = m.getLatLng();
    this.old_marker = {
      lat: old_coords.lat,
      lng: old_coords.lng,
      popup: m.getPopup()?.getContent(),
    };
  }

  drangendUpdate(m: Marker) {
    const new_coords = m.getLatLng();
    const new_marker = {
      lat: new_coords.lat,
      lng: new_coords.lng,
      popup: m.getPopup()?.getContent(),
    };
    console.log('NEW', new_marker);
    //this.markers[this.markers.indexOf(m)].setLatLng(new_coords);
    const idx = this.markerData.findIndex(
      (obj) => JSON.stringify(obj) === JSON.stringify(this.old_marker)
    );
    this.markerData[idx] = new_marker;
    console.log(this.markerData);
    const mapId = this.location.path().split('/')[4];
    this.mapsService.updateMap(mapId, this.markerData).subscribe(() => {});
  }
  contextUpdate(m: Marker) {
    this.clickedPin = true;
    const selected_coords = m.getLatLng();
    this.selected_marker = {
      lat: selected_coords.lat,
      lng: selected_coords.lng,
      popup: m.getPopup()?.getContent(),
    };
    console.log(this.selected_marker);
    this.toRemove = m;
  }

  removePin(m: any) {
    this.mapRef.removeLayer(m);
    this.toRemove = null;
    this.clickedPin = false;

    const idx = this.markerData.findIndex(
      (obj) => JSON.stringify(obj) === JSON.stringify(this.selected_marker)
    );
    if (idx > -1) this.markerData.splice(idx, 1);
    console.log(this.markerData);

    this.selected_marker = {};
    const mapId = this.location.path().split('/')[4];
    this.mapsService.updateMap(mapId, this.markerData).subscribe(() => {});
  }

  public isOnPin(): boolean {
    // TODO: implement logic to check if user clicked on a pin
    return this.clickedPin;
  }

  // Opens the context menu
  open({ x, y }: MouseEvent) {
    this.close();
    const positionStrategy = this.overlay
      .position()
      .flexibleConnectedTo({ x, y })
      .withPositions([
        {
          originX: 'end',
          originY: 'bottom',
          overlayX: 'end',
          overlayY: 'top',
        },
      ]);

    this.overlayRef = this.overlay.create({
      positionStrategy,
      scrollStrategy: this.overlay.scrollStrategies.close(),
    });

    this.overlayRef.attach(
      new TemplatePortal(this.userMenu!, this.viewContainerRef, {
        // Here you can execute code based on what was right clicked
        // You will need to pass that as a param to the enclosing method
      })
    );

    // Add event to close context menu on click outside
    this.closeEventSub = fromEvent<MouseEvent>(document, 'click')
      .pipe(
        filter((event) => {
          const clickTarget = event.target as HTMLElement;
          return (
            !!this.overlayRef &&
            !this.overlayRef.overlayElement.contains(clickTarget)
          );
        }),
        take(1)
      )
      .subscribe(() => this.close());
  }

  // Close context menu
  public close() {
    this.closeEventSub && this.closeEventSub.unsubscribe();
    if (this.overlayRef) {
      this.overlayRef.dispose();
      this.overlayRef = null;
    }
  }
}
