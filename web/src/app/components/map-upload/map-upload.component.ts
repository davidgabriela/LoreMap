import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { FileUploadService } from 'src/app/services/file-upload/file-upload.service';

@Component({
  selector: 'app-map-upload',
  templateUrl: './map-upload.component.html',
  styleUrls: ['./map-upload.component.scss'],
})
export class MapUploadComponent {
  selectedFiles?: FileList;
  selectedFileNames: string[] = [];
  mapId: string = '';

  previews: string[] = [];
  message: string[] = [];
  imageInfos?: Observable<any>;

  constructor(
    private uploadService: FileUploadService,
    private router: Router
  ) {}

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

  upload(idx: number, file: File): void {
    if (file) {
      this.uploadService.upload(file).subscribe((res) => {
        console.log(res.data._id);
        this.mapId = res.data._id;
        this.router.navigate([`/map/${this.mapId}`]);
        const msg = 'Uploaded the file successfully: ' + file.name;
        this.message.push(msg);
        this.imageInfos = this.uploadService.getFiles();
      });
    }
  }

  uploadFiles(): void {
    this.message = [];

    if (this.selectedFiles) {
      for (let i = 0; i < this.selectedFiles.length; i++) {
        this.upload(i, this.selectedFiles[i]);
      }
      // Switch to new page with that map
    }
  }
}
