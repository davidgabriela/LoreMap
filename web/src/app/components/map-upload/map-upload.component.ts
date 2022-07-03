import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MapsService } from 'src/app/services/maps/maps.service';

@Component({
  selector: 'app-map-upload',
  templateUrl: './map-upload.component.html',
  styleUrls: ['./map-upload.component.scss'],
})
export class MapUploadComponent {
  selectedFiles?: FileList;
  selectedFileNames: string[] = [];
  mapId: string = '';
  loreId: string = '';

  previews: string[] = [];
  message: string[] = [];

  mapName = new FormControl('', [Validators.required]);
  constructor(private mapsService: MapsService, private router: Router) {}

  ngOnInit() {
    console.log('LORE ID?? ', this.router.url);
  }
  selectFiles(event: any): void {
    this.message = [];
    this.selectedFileNames = [];
    this.selectedFiles = event.target.files;

    this.previews = [];
    if (this.selectedFiles && this.selectedFiles[0]) {
      const numberOfFiles = this.selectedFiles.length;
      for (let i = 0; i < numberOfFiles; i++) {
        const reader = new FileReader();

        reader.onload = (e: any) => {
          this.previews.push(e.target.result);
        };

        reader.readAsDataURL(this.selectedFiles[i]);

        this.selectedFileNames.push(this.selectedFiles[i].name);
      }
    }
  }

  upload(name: String, file: File): void {
    if (file) {
      this.loreId = this.router.url.split('/')[2];
      this.mapsService
        .upload(file, this.loreId, this.mapName.value)
        .subscribe((res) => {
          console.log(res.data._id);
          this.mapId = res.data._id;
          this.router.navigate([
            `lore-collection/${this.loreId}/maps/${this.mapId}`,
          ]);
          const msg = 'Uploaded the file successfully: ' + file.name;
          this.message.push(msg);
        });
    }
  }

  uploadFiles(name: string): void {
    this.message = [];

    if (this.selectedFiles) {
      this.upload(name, this.selectedFiles[0]);
    }
  }
}
